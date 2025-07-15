import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/crypto-module/crypto.service';
import { CreateUserInput } from './dto/create-user.input';
import { RegisterInputWithToken } from './dto/RegisterWithToken.input';
import { Group } from 'src/groups/entities/group.entity';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateMyProfile } from './dto/update-my-profile.input';
import { FileEntity } from 'src/file/entities/file.entity';
import { RedisService } from 'src/redis/redis.service';
import { Response } from 'express';
import { SessionService, TSession } from 'src/session/session.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
    @InjectRepository(Group) private readonly groupService: Repository<Group>,
    private readonly cryptoService: CryptoService,
    private readonly redisService: RedisService,
    private readonly sessionService: SessionService,
  ) { }

  async getAllUsers() {
    return await this.userRepository.find()
  }

  async getCurrentUser(session_uuid: string) {
    const session = await this.redisService.get(`session:${session_uuid}`) as { user: User, deviceId: string };
    if (!session.user.isActivated) {
      await this.sessionService.kill_sessions_without_current(session_uuid)
      await this.sessionService.kill_session(session_uuid);
      throw new ForbiddenException("Учетная запись заблокирована")
    }
    return session.user
  }

  async updateUser(input: UpdateUserInput,) {

    const user = await this.userRepository.findOneBy({ ID: input.ID })
    if (!user)
      throw new NotFoundException(`Пользователь c ID: ${input.ID} не найден`);
    const updUser = await this.userRepository.save({ ...user, input });

    return updUser
  }

  async confirm(confirmInput: User) {
    return this.userRepository.save(confirmInput);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, relations: ['avatar'] })
    return user
  }

  async getUserByID(ID: number) {
    const user = await this.userRepository.findOne({
      where: {
        ID
      }, relations: ['avatar']
    })
    if (!user)
      throw new NotFoundException(`Пользователь c ID: ${ID} не найден`)
    return user
  }

  async getUserByIDWithRelatios(ID: number): Promise<User | null> {
    return await this.userRepository.findOne({ relations: ["groups"], where: { ID } })
  }

  async registerUser(createUserInput: RegisterInputWithToken) {
    const hashPassword = await this.cryptoService.hashData(createUserInput.password)
    return await this.userRepository.save({ ...createUserInput, password: hashPassword })
  }

  async createUser(createUserInput: CreateUserInput) {
    const candidate = await this.userRepository.findOneBy({ email: createUserInput.email });
    if (candidate) {
      throw new ForbiddenException({ message: "Пользователь с таким email уже зарегистрирован" })
    }
    const hashPassword = await this.cryptoService.hashData(createUserInput.password)
    const user = await this.userRepository.save({ ...createUserInput, password: hashPassword });

    let group = await this.groupService.findOne({ relations: ["users"], where: { group_name: "Users" } });

    if (!group) {
      group = await this.groupService.save({ group_name: "Users", description: "Default group users" })
    }
    group.users.push(user);
    await this.groupService.save(group);
    return user
  }

  async updatePass(user: User, password: string) {
    return await this.userRepository.save({ ...user, password, activationToken: null })
  }

  async changePassword({ ID, ...input }: ChangePasswordInput, session_uuid: string) {
    const user = await this.userRepository.findOneBy({ ID })
    if (!user) throw new NotFoundException("Пользователь не найден");
    const compare = await this.cryptoService.comparePassword(input.currentPassword, user.password);
    if (!compare)
      throw new ForbiddenException("Вы ввели не верный текущий пароль")
    const hashPassword = await this.cryptoService.hashData(input.newPassword);
    const result = await this.userRepository.save({ ...user, password: hashPassword })
    await this.sessionService.kill_sessions_without_current(session_uuid)
    return result
  }

  async deleteUser(ID: number) {
    return await this.userRepository.delete({ ID })
  }


  async updateMyProfile(input: UpdateMyProfile, ctx: Response) {
    const session_uuid = ctx.req.cookies.session_uuid;
    const session_ttl = await this.redisService.getTtl(`session:${session_uuid}`);
    const session = await this.redisService.get<TSession>(`session:${session_uuid}`);
    const current_user = session?.user!;

    if (input.ID !== current_user.ID)
      throw new ForbiddenException("Обновить можно только свой профиль")
    // const user = await this.userRepository.findOne({ where: { ID: input.ID }, relations: ['avatar'] });
    // if (!user) throw new NotFoundException(`Пользователь c ID: ${input.ID} не найден`);
    const updUser = await this.userRepository.save({ ...current_user, ...input })
    const data: TSession = { ...session!, user: updUser };
    await this.redisService.set(`session:${session_uuid}`, JSON.stringify(data), session_ttl)
    return updUser
  }

  async setUserAvatar({ uploadedBy, ...avatar }: FileEntity, ctx: Response) {
    const session_uuid = ctx.req.cookies.session_uuid;
    const session_ttl = await this.redisService.getTtl(`session:${session_uuid}`);
    const session = await this.redisService.get<TSession>(`session:${session_uuid}`);

    await this.userRepository.save({
      ID: uploadedBy?.ID,
      avatar
    });
    const updatedUser = await this.userRepository.findOne({
      where: { ID: uploadedBy?.ID },
      relations: ['avatar']
    });
    const data: TSession = { ...session!, user: updatedUser! };
    await this.redisService.set(`session:${session_uuid}`, JSON.stringify(data), session_ttl)
    return updatedUser
  }
}
