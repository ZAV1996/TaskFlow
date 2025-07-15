import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { GroupType } from './types/group.type';
import { UseGuards, UsePipes } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateGroupInput } from './inputs/create-group.input';
import { UpdateGroupInput } from './inputs/update-group.input';
import { GroupMemberInput } from './inputs/groupMember.input';
import { AccessGuard } from 'src/common/guards/access.guard';
import { ZodValidationPipe } from 'nestjs-zod';
import { AdminGuard } from 'src/common/guards/admin.guard';
@Resolver(() => GroupType)
export class GroupsResolver {
  constructor(
    private readonly groupsService: GroupsService
  ) { }

  @UseGuards(AccessGuard)
  @Query(() => [GroupType])
  async getAllGroups() {
    return await this.groupsService.getAllGroups();
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Query(() => GroupType)
  async getGroupByID(@Args("GetGropByID", { type: () => Int }) id: number) {
    return await this.groupsService.getGroupByID(id)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => GroupType)
  async createGroup(@Args('CreateGroupInput') createGroupInput: CreateGroupInput) {
    return await this.groupsService.createGroup(createGroupInput);
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => GroupType)
  async updateGroup(@Args("UpdateGroupInput") updateGroupInput: UpdateGroupInput) {
    return this.groupsService.updateGroup(updateGroupInput);
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => Boolean)
  async removeGroup(@Args("RemoveGroup", { type: () => Int, nullable: false }) id: number) {
    return await this.groupsService.removeGroup(id)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => [User])
  async removeUserFromGroup(@Args("removeUserFromGroup", { type: () => GroupMemberInput }) { groupID, userID }: GroupMemberInput) {
    return await this.groupsService.removeUserFromGroup(groupID, userID);
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => [User])
  async addUserInGroup(@Args("AddUserInGroup", { type: () => GroupMemberInput }) { groupID, userID }: GroupMemberInput) {
    return await this.groupsService.addUserInGroup(groupID, userID);
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Query(() => [User])
  async getUsersInGroup(@Args("GetUsersInGroup", { type: () => Int }) groupID: number) {
    const users = await this.groupsService.getGroupUsersByID(groupID);
    return users;
  }

  @UseGuards(AccessGuard)
  @Query(() => [GroupType])
  async getUserGroups(@Args("GetUserGroups", { type: () => Int }) groupID: number) {
    const users = await this.groupsService.getUserGroups(groupID);
    return users;
  }
}
