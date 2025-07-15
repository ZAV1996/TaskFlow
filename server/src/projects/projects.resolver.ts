import {
  Resolver, Query, Mutation, Args, Int,
  Context
} from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';
import { ProjectType } from './types/project.type';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/common/guards/access.guard';
import { PermissionSchemeKeys } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { PermissionKeys } from 'src/permission-scheme-rules/decorators/permission-keys.decorator';
import { InputID } from 'src/workflow/inputs/create.input';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { Roles, RolesEnum } from 'src/common/decotators/Roles.decorator';
import { IssueGuard } from 'src/issues/guards/issue.guard';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService,
    private userService: UsersService
  ) { }


  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => ProjectType)
  async createProject(@Args("Input") createProjectInput: CreateProjectInput) {
    return await this.projectsService.createProject(createProjectInput);
  }



  @PermissionKeys([PermissionSchemeKeys.ADMINISTER_PROJECTS])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Mutation(() => ProjectType)
  async updateProject(@Args({ name: "Input" }) updateProject: UpdateProjectInput) {
    return await this.projectsService.updateProject(updateProject);
  }



  @PermissionKeys([PermissionSchemeKeys.ADMINISTER_PROJECTS])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Mutation(() => Boolean, { nullable: true })
  async deleteProject(@Args({ name: "Input", type: () => InputID }) { ID }: InputID) {
    return await this.projectsService.deleteProject(ID) ? true : false;
  }

  @UseGuards(AccessGuard, AdminGuard, IssueGuard)
  @Roles(RolesEnum.ADMINISTRATORS)
  @Query(() => [ProjectType])
  async getAllProjects() {
    return await this.projectsService.getAllProjects()
  }

  @UseGuards(AccessGuard)
  @Query(() => [ProjectType])
  async getAvailableProjects(@Context() ctx: Response) {
    const cookies = ctx.req.cookies.session_uuid;
    const user = await this.userService.getCurrentUser(cookies);
    return await this.projectsService.getAvailableProjects(user!)
  }
  @UseGuards(AccessGuard)
  @Query(() => [ProjectType])
  async getRecentProjects(@Context() ctx: Response) {
    const cookies = ctx.req.cookies.session_uuid;
    const user = await this.userService.getCurrentUser(cookies);
    return await this.projectsService.getRecentProjects(user!)
  }

  @PermissionKeys([PermissionSchemeKeys.BROWSE_PROJECTS])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Query(() => ProjectType)
  async getProjectByID(@Args("Input", { type: () => InputID }) input: InputID) {
    return await this.projectsService.getProjectByID(input.ID)
  }

  //TODO
  // @PermissionKeys([PermissionSchemeKeys.BROWSE_PROJECTS])
  // @Roles(RolesEnum.ADMINISTRATORS)
  // @UseGuards(AccessGuard, ProjectGuard)
  // @Query(() => [ProjectType])
  // async searchProject(@Args("Input", { type: () => String }) searchText: string) {
  //   return await this.projectsService.searchProject(searchText)
  // }
}
