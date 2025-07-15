import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectComponentsService } from './project-components.service';
import { ProjectComponent } from './entities/project-component.entity';
import { ProjectComponentType } from './types/project-component.type';
import { CreateProjectComponentInput } from './inputs/create.input';
import { InputID } from 'src/workflow/inputs/create.input';
import { UpdateProjectComponentInput } from './inputs/update.input';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/common/guards/access.guard';
import { Roles, RolesEnum } from 'src/common/decotators/Roles.decorator';
import { IssueGuard } from 'src/issues/guards/issue.guard';
import { PermissionKeys } from 'src/permission-scheme-rules/decorators/permission-keys.decorator';
import { PermissionKey } from 'src/init/entities/PermissionKeys.entity';
import { PermissionSchemeKeys } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';

@Resolver(() => ProjectComponentType)
export class ProjectComponentsResolver {
  constructor(private readonly projectComponentsService: ProjectComponentsService) { }
  @Roles(RolesEnum.ADMINISTRATORS)
  @PermissionKeys([PermissionSchemeKeys.ADMINISTER_PROJECTS, PermissionSchemeKeys.ASSIGNABLE_USER])
  @UseGuards(AccessGuard, IssueGuard)
  @Mutation(() => ProjectComponentType)
  createProjectComponent(@Args('Input') createProjectComponentInput: CreateProjectComponentInput) {
    return this.projectComponentsService.createComponent(createProjectComponentInput);
  }
  @Mutation(() => ProjectComponentType)
  async updateComponent(@Args("updateProjectComponentInput") input: UpdateProjectComponentInput) {
    return await this.projectComponentsService.updateComponent(input)
  }
  @Mutation(() => [String])
  async deleteComponent(@Args("inputID") input: InputID) {
    return await this.projectComponentsService.deleteComponent(input)
  }
}
