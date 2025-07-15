import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatusService } from './status.service';
import { CreateOrUpdateStatusInput } from './inputs/createOrUpdate.input';
import { StatusType } from './types/status.type';
import { InputID } from 'src/workflow/inputs/create.input';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/common/guards/access.guard';
import { PermissionKeys } from 'src/permission-scheme-rules/decorators/permission-keys.decorator';
import { PermissionSchemeKeys } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { Roles, RolesEnum } from 'src/common/decotators/Roles.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { IssueGuard } from 'src/issues/guards/issue.guard';


@Resolver(() => StatusType)
export class StatusResolver {
  constructor(private readonly statusService: StatusService) { }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => [StatusType])
  async createStatus(@Args("createStatusInput") input: CreateOrUpdateStatusInput) {
    return await this.statusService.createStatus(input)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => StatusType)
  async updateStatus(@Args("createStatusInput") input: CreateOrUpdateStatusInput) {
    return await this.statusService.updateStatus(input)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => Boolean)
  async deleteStatus(@Args("deleteStatusInput") input: InputID) {
    return await this.statusService.deleteStatus(input)
  }

  @PermissionKeys([PermissionSchemeKeys.VIEW_READONLY_WORKFLOW])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Query(() => [StatusType])
  async getAllStatusesByProjectID(@Args("Input") input: InputID) {
    return await this.statusService.getAllStatusesByProjectID(input)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Query(() => [StatusType])
  async getStatusesByWorkflowID(@Args("getWorkflowStatuses") input: InputID) {
    return await this.statusService.getWorkflowStatuses(input)
  }
}
