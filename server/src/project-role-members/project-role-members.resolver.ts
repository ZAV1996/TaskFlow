import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectRoleMembersService } from './project-role-members.service';
import { ProjectRoleMember } from './entities/project-role-member.entity';
import { ProjectRoleMemberType } from './types/project-role-member.type';
import { ProjectRoleMemberInput } from './inputs/project-role-member.input';
import { AddMemberInRoleInput } from './inputs/add-member.input';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/common/guards/access.guard';
import { PermissionSchemeKeys } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { PermissionKeys } from 'src/permission-scheme-rules/decorators/permission-keys.decorator';
import { Roles, RolesEnum } from 'src/common/decotators/Roles.decorator';
import { GetProjectRoleMemberInput } from './inputs/get-member.input';
import { User } from 'src/users/entities/user.entity';
import { IssueGuard } from 'src/issues/guards/issue.guard';


@Resolver(() => ProjectRoleMember)
export class ProjectRoleMembersResolver {
  constructor(private readonly projectRoleMembersService: ProjectRoleMembersService) { }

  @UseGuards(AccessGuard)
  @PermissionKeys([PermissionSchemeKeys.ADMINISTER_PROJECTS])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(IssueGuard)
  @Query(() => [User], { nullable: true })
  async getProjectRoleMembers(@Args({ type: () => GetProjectRoleMemberInput, name: "getProjectRoleMembers" }) input: GetProjectRoleMemberInput) {
    return await this.projectRoleMembersService.getProjectRoleMembers(input)
  }

  @Mutation(() => ProjectRoleMemberType)
  async addMemberInProjectRole(@Args({ type: () => AddMemberInRoleInput, name: "addMemberInProjectRole" }) input: AddMemberInRoleInput) {
    return await this.projectRoleMembersService.addMemberInProjectRole(input)
  }

}
