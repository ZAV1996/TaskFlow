import { Resolver, Mutation, Query, Int, Args } from '@nestjs/graphql';
import { WorkflowService } from './workflow.service';
import { WorkflowType } from './types/common/workflow.type';
import { CreateWorkflowInput, InputID, UpdateWorkflowInput } from './inputs/create.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { PermissionKeys } from 'src/permission-scheme-rules/decorators/permission-keys.decorator';
import { PermissionSchemeKeys } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { Roles, RolesEnum } from 'src/common/decotators/Roles.decorator';
import { AccessGuard } from 'src/common/guards/access.guard';
import { IssueGuard } from 'src/issues/guards/issue.guard';


@Resolver(() => WorkflowType)
export class WorkflowResolver {
  constructor(
    private readonly workflowService: WorkflowService) { }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => WorkflowType)
  async createWorkflow(@Args("createWorkflowInput") createWorkflowInput: CreateWorkflowInput) {
    return await this.workflowService.create_workflow(createWorkflowInput)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => WorkflowType)
  async updateWorkflow(@Args("updateWorkflowInput") updateWorkflowInput: UpdateWorkflowInput) {
    return await this.workflowService.updateWorkflow(updateWorkflowInput)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => Boolean)
  async deleteWorkflow(@Args("Input") ID: InputID) {
    return await this.workflowService.delete_workflow(ID)
  }


  @UseGuards(AccessGuard, AdminGuard)
  @Query(() => WorkflowType)
  async getWorkflowByID(@Args("Input") ID: InputID) {
    return await this.workflowService.getWorkflowByID(ID)
  }
  @PermissionKeys([PermissionSchemeKeys.VIEW_READONLY_WORKFLOW])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(AccessGuard, IssueGuard)
  @Query(() => WorkflowType)
  async getWorkflowByProjectID(@Args("Input") ID: InputID) {
    return await this.workflowService.getWorkflowByProjectID(ID)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Query(() => [WorkflowType])
  async getAllWorkflows() {
    return await this.workflowService.getAllWorkflows()
  }
  @UseGuards(AccessGuard, AdminGuard)
  @Query(() => [WorkflowType])
  async getAllWorkflowsByProjectID(@Args("Input") ID: InputID) {
    return await this.workflowService.getAllWorkflowsByProjectID(ID)
  }
}
