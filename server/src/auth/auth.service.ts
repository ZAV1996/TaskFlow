import { ConflictException, ForbiddenException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs'
import { SmtpSendlerService } from 'src/smtp-sendler/smtp-sendler.service';
import { CryptoService } from 'src/crypto-module/crypto.service';
import { Request, Response } from 'express';
import { SessionService, TDevice, TSession } from 'src/session/session.service';
import { RegisterInput } from './dto/register.input';
import { ConfirmInput } from './dto/confirm.input';
import { LoginInput } from './dto/login.input';
import { ForgotPassInput } from './dto/forgot.dto';
import { SetNewPassForgot } from './dto/set-new-pass.input';
import { GroupsService } from 'src/groups/groups.service';
import { createHash } from 'crypto';
import { RedisService } from 'src/redis/redis.service';
import { parseExpiresIn } from 'src/common/utils/parse-expires-in';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { getClientIp } from 'src/common/utils/get-client-ip';
import { getDeviceID } from 'src/common/utils/get-divice-id';
import { Duration } from 'luxon';
import { SessionResolver } from 'src/session/session.resolver';

@Injectable()
export class AuthService {
  constructor(
    private redisService: RedisService,
    private usersService: UsersService,
    private smpt: SmtpSendlerService,
    private crypto: CryptoService,
    private sessionService: SessionService,
    private sessionResolver: SessionResolver,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) { }

  ///////////////////////////////////////////////////////
  async register(registerDTO: RegisterInput) {
    const temporary_candidate_ttl = await this.redisService.getTtl(`register:email:${registerDTO.email}`)
    const totalMinutes = Math.round(temporary_candidate_ttl / 60);
    const duration = Duration.fromObject({ minutes: totalMinutes })
      .shiftTo('hours', 'minutes')
      .toHuman({ listStyle: 'long', unitDisplay: 'long' });

    const temporary_candidate = await this.redisService.get(`register:email:${registerDTO.email}`)
    if (temporary_candidate)
      throw new HttpException(`Пользователь с таким email уже регистрировался, однако учетную запись не подтвердил, оставшееся время для подтверждения учетной записи: ${duration}`, HttpStatus.BAD_REQUEST)
    const candidate = await this.usersService.getUserByEmail(registerDTO.email);
    if (candidate)
      throw new HttpException("Пользователь с таким email уже зарегистрирован.", HttpStatus.BAD_REQUEST)
    const uuid = uuidv4();
    const password = await this.crypto.hashData(registerDTO.password)
    const user = this.userRepo.create({ ...registerDTO, isActivated: true, password });
    await this.redisService.set(`register:email:${registerDTO.email}`, JSON.stringify({ user, uuid } as { user: User, uuid: string }), (parseExpiresIn("1d")))
    await this.smpt.sendUserConfirmation(user, uuid)
    return "Вам на почту придет письмо для активации учетной записи."
  }

  async confirm({ email, activationToken }: ConfirmInput) {
    const temporary_user = await this.redisService.get<{ user: User, uuid: string }>(`register:email:${email}`)
    if (!temporary_user) {
      throw new ForbiddenException("Срок действия ссылки для активации аккаунта истек")
    }

    if (temporary_user.uuid !== activationToken) throw new ForbiddenException("Не верная ссылка для подтверждения учетной записи")
    const user = await this.usersService.userRepository.save(temporary_user.user);
    await this.redisService.del(`register:email:${email}`)
    if (user) {
      return "Учетная запись успешно подтверждена.";
    } else {
      throw new Error("Ошибка регистрации, повторите попытку");
    }
  }

  private async createLogin(credintals: LoginInput, res: Response, deviceId: string, device: TDevice) {
    const user = await this.validate(credintals);
    const session_expiresIn = process.env.SESSION_EXPIRES_IN || '7d';
    const maxAgeSession = parseExpiresIn(session_expiresIn);
    const session_uuid = uuidv4();
    const sessionData = {
      user,
      session_uuid,
      deviceId: deviceId,
      createdAt: Date.now(),
      device,
      expireIn: maxAgeSession
    } as TSession;

    await this.sessionService.create_session(sessionData)
    res.cookie('session_uuid', session_uuid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS в продакшене
      sameSite: 'strict', // Или 'none' для кросс-домена
      path: '/', // Убедитесь, что путь покрывает GraphQL
      maxAge: maxAgeSession * 1000
    });
    return user;
  }
  async login(credintals: LoginInput, ctx: { res: Response, req: Request }) {
    const deviceId = getDeviceID(ctx.req)
    const session_uuid = ctx.req.cookies.session_uuid;
    if (session_uuid) {
      const session = await this.redisService.get<TSession>(`session:${session_uuid}`)
      if (session?.deviceId === deviceId) throw new ConflictException("Вы уже авторизованы")
    }
    const divice: TDevice = {
      userAgent: ctx.req.headers['user-agent']!,
      ip: getClientIp(ctx.req),
    }
    return await this.createLogin(credintals, ctx.res, deviceId, divice);
  }

  async logout(ctx: Response) {
    const session_uuid = ctx.req.cookies.session_uuid;
    ctx.req.res?.clearCookie("session_uuid");
    return await this.sessionResolver.kill_session(session_uuid)
  }

  async forgot({ email }: ForgotPassInput) {
    const candidate = await this.usersService.getUserByEmail(email);
    if (!candidate) throw new UnauthorizedException(UnauthorizedException);
    const uuid = uuidv4();
    const updateUser = await this.redisService.set(`forgot:email:${email}`, uuid, parseExpiresIn("1d"));
    if (updateUser) {
      await this.smpt.sendForgotPasswordMail(candidate, uuid);
      return "Вам на почту придет с ссылкой на изменение пароля."
    }
  }

  async updateForgotPass(updateForgotPass: SetNewPassForgot) {
    const token = await this.redisService.get<string>(`forgot:email:${updateForgotPass.email}`)
    if (!token)
      throw new ForbiddenException("Срок действия ссылки на сброс пароля истек.")
    if (updateForgotPass.token !== token) throw new ForbiddenException("Не верная ссылка на восстановление пароля")
    const user = await this.usersService.getUserByEmail(updateForgotPass.email);
    if (!user) throw new NotFoundException("Пользователь не найден")
    const result = await this.usersService.updatePass(user, await this.crypto.hashData(updateForgotPass.password))
    await this.redisService.del(`forgot:email:${updateForgotPass.email}`)
    return result
  }
  private async validate(credentials: LoginInput) {
    const candidate = await this.usersService.getUserByEmail(credentials.email);
    if (!candidate) {
      throw new UnauthorizedException({ message: "Пользователь с таким email не зарегистрирован." })
    }
    const passwordCorrect = await bcrypt.compare(credentials.password, candidate.password);
    if (!candidate.isActivated) {
      throw new UnauthorizedException({ message: "Учетная запись заблокирована" })
    }
    if (!passwordCorrect)
      throw new UnauthorizedException({ message: "Вы ввели неправильный пароль. Попробуйте снова." })
    else return candidate
  }

}
