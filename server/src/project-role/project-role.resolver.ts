import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectRoleService } from './project-role.service';
import { ProjectRole } from './entities/project-role.entity';
import { ProjectRoleType } from './types/project-role.type';
import { CreateProjectRoleInput } from './inputs/create-project-role.input';
import { InputID } from 'src/workflow/inputs/create.input';
import { DeleteResult } from 'typeorm';
import { ProjectRoleInput } from './inputs/project-role.input';
import { UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { AccessGuard } from 'src/common/guards/access.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';


@Resolver(() => ProjectRole)
export class ProjectRoleResolver {
  constructor(private readonly projectRoleService: ProjectRoleService) { }

  @UseGuards(AccessGuard)
  @Query(() => [ProjectRoleType])
  async getProjecRoles() {
    return await this.projectRoleService.getProjectRoles()
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => Boolean)
  async deleteProjectRole(@Args('id', { type: () => InputID }) input: InputID) {
    return await this.projectRoleService.deleteProjectRole(input) ? true : false
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => ProjectRoleType)
  async createProjectRole(@Args('createProjectRole', { type: () => CreateProjectRoleInput }) input: CreateProjectRoleInput) {
    return await this.projectRoleService.createProjectRole(input)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => ProjectRoleType)
  async updateProjectRole(@Args('updateProjectRole', { type: () => ProjectRoleInput }) input: ProjectRoleInput) {
    return await this.projectRoleService.updateProjectRole(input)
  }
}
