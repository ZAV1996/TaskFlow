import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { IssuesService } from './issues.service';
import { Issue } from './entities/issue.entity';
import { InputID } from 'src/workflow/inputs/create.input';
import { IssueType } from './types/issue.type';
import { CreateIssueInput } from './inputs/create.input';
import { UpdateIssueInput } from './inputs/update.input';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/common/guards/access.guard';
import { IssueGuard } from './guards/issue.guard';
import { PermissionKeys } from 'src/permission-scheme-rules/decorators/permission-keys.decorator';
import { PermissionSchemeKeys } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { Roles, RolesEnum } from 'src/common/decotators/Roles.decorator';
import { WorkflowGuard } from 'src/workflow/guards/workflow.guard';
import { FilterInput } from 'src/filter/inputs/filter.input';
import { Response } from 'express';
import { UsersResolver } from 'src/users/users.resolver';

@Resolver(() => IssueType)
export class IssuesResolver {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly userResolver: UsersResolver
  ) { }

  @PermissionKeys([
    PermissionSchemeKeys.BROWSE_PROJECTS
  ])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Query(() => [IssueType], { nullable: true })
  async getAllIssuesByProjectID(@Args("Input") input: InputID) {
    return await this.issuesService.getAllIssuesByProjectID(input)
  }

  @PermissionKeys([
    PermissionSchemeKeys.BROWSE_PROJECTS
  ])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Query(() => IssueType, { nullable: true })
  async getIssueByID(@Args("Input") input: InputID) {
    return await this.issuesService.getIssueByID(input);
  }

  @PermissionKeys([
    PermissionSchemeKeys.CREATE_ISSUES,
    PermissionSchemeKeys.ASSIGN_ISSUES,
    PermissionSchemeKeys.ASSIGNABLE_USER,
    PermissionSchemeKeys.MODIFY_AUTHOR,
    PermissionSchemeKeys.CREATE_ATTACHMENTS,
    PermissionSchemeKeys.LINK_ISSUES
  ])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Mutation(() => IssueType)
  async createIssue(@Args("Input") input: CreateIssueInput) {
    return await this.issuesService.createIssue(input)
  }

  @PermissionKeys([
    PermissionSchemeKeys.EDIT_ISSUES,
    PermissionSchemeKeys.ASSIGN_ISSUES,
    PermissionSchemeKeys.ASSIGNABLE_USER,
    PermissionSchemeKeys.LINK_ISSUES,
    PermissionSchemeKeys.MODIFY_AUTHOR,
    PermissionSchemeKeys.CREATE_ATTACHMENTS,
    PermissionSchemeKeys.DELETE_ALL_ATTACHMENTS,
    PermissionSchemeKeys.DELETE_OWN_ATTACHMENTS,
    PermissionSchemeKeys.TRANSITION_ISSUES,
  ])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard, WorkflowGuard)
  @Mutation(() => IssueType)
  async updateIssue(@Args("Input") Input: UpdateIssueInput) {
    return await this.issuesService.updateIssue(Input)
  }

  @PermissionKeys([
    PermissionSchemeKeys.DELETE_ISSUES
  ])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Mutation(() => Boolean)
  async deleteIssue(@Args("Input") input: InputID) {
    return await this.issuesService.deleteIssue(input);
  }


  @PermissionKeys([
    PermissionSchemeKeys.BROWSE_PROJECTS
  ])
  @Roles(RolesEnum.ADMINISTRATORS)
  //@UseGuards(AccessGuard, IssueGuard)
  @Query(() => [IssueType], { nullable: true })
  async filterIssues(@Args('Input') filter: FilterInput, @Context() ctx: Response) {
    const user = await this.userResolver.getCurrentUser(ctx)
    return this.issuesService.filterIssues(filter, user!);
  }

  // @PermissionKeys([
  //   PermissionSchemeKeys.BROWSE_PROJECTS
  // ])
  // @Roles(RolesEnum.ADMINISTRATORS)
  // //@UseGuards(AccessGuard, IssueGuard)
  // @Query(() => [IssueType])
  // async filterIssuesByFilterId(@Args('Input', { type: () => InputID }) { ID }: InputID) {
  //   return this.issuesService.filterIssuesByFilterId(ID);
  // }
}
