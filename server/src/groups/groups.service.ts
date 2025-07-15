import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateGroupInput } from './inputs/create-group.input';
import { UpdateGroupInput } from './inputs/update-group.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForbiddenError } from '@nestjs/apollo';
import { UsersService } from 'src/users/users.service';
import { Group } from './entities/group.entity';
export enum GroupRelations {
  USERS = "users"
}
@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    private readonly userService: UsersService,
  ) { }
  //////////////////////////////////////////////////////////////////////////////////
  async createGroup(createGroupInput: CreateGroupInput) {
    const group = await this.groupRepository.findOneBy({ group_name: createGroupInput.group_name })
    if (group)
      throw new ForbiddenException("Группа с таким именем уже существует")
    return await this.groupRepository.save({ ...createGroupInput });
  }
  async updateGroup(updateGroup: UpdateGroupInput) {
    const group = await this.groupRepository.findOneBy({ ID: updateGroup.ID });
    if (!group) {
      throw new ForbiddenError("Группа не найдена")
    }
    return await this.groupRepository.save({ ...group, ...updateGroup })
  }
  async removeGroup(ID: number) {
    const group = await this.groupRepository.findOneBy({ ID });
    if (!group) {
      throw new ForbiddenError("Группа не найдена")
    }
    if (group.group_name === "Users" || group.group_name === "Administrators")
      throw new ForbiddenException("Нельзя удалять системные группы")
    await this.groupRepository.delete({ ID });
    return true
  }

  async getGroupByName(group_name: string, relations: GroupRelations[] = []) {
    return await this.groupRepository.findOne({ where: { group_name }, relations })
  }
  async getGroupByID(ID: number, withRelations?: boolean) {
    if (withRelations)
      return await this.groupRepository.findOne({ relations: ["users"], where: { ID } })
    else
      return await this.groupRepository.findOneBy({ ID })
  }
  async getAllGroups() {
    return await this.groupRepository.find({ select: ["ID", "create_date", "description", "group_name", "updated_date"] })
  }
  //////////////////////////////////////////////////////////////////////////////////
  async getGroupUsersByID(ID: number) {
    const group = await this.groupRepository.findOne({ relations: ["users"], where: { ID } });
    if (!group)
      throw new NotFoundException("Группа не найдена")
    return group.users
  }

  async getUserGroups(ID: number) {
    const user = await this.userService.getUserByIDWithRelatios(ID);
    if (!user)
      throw new ForbiddenError("Поьзователь не найден")
    return user.groups
  }
  async addUserInGroup(groupID: number, userID: number) {
    const group = await this.groupRepository.findOne({ relations: ["users"], where: { ID: groupID } });
    const user = await this.userService.getUserByID(userID);
    if (!group)
      throw new NotFoundException("Группа не найдена")
    if (!user)
      throw new NotFoundException("Пользователь не найден")
    const candidate = group.users.find((candidate) => candidate.ID === user.ID);
    if (candidate)
      throw new ForbiddenException("Пользователь уже состоит в этой группе")
    group.users.push(user);
    return (await this.groupRepository.save(group)).users;
  }
  async removeUserFromGroup(groupID: number, userID: number) {
    const group = await this.getGroupByID(groupID, true);
    if (!group)
      throw new NotFoundException("Группа не найдена")
    if (group.group_name === "Users")
      throw new ForbiddenError("Из данной группы нельзя удалять пользователей")
    if (group.group_name === "Administrators" && group.users.length === 1)
      throw new ForbiddenError("В группе Administrators должен быть минимум 1 пользователь")
    group.users = group.users.filter((user) => user.ID !== userID);
    await this.groupRepository.save(group)
    return group.users;
  }
}
