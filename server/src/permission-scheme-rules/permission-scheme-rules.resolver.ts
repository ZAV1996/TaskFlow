import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionSchemeRulesService } from './permission-scheme-rules.service';
import { PermissionSchemeKeys, PermissionSchemeRule } from './entities/permission-scheme-rule.entity';
import { PermissionSchemeRuleType } from './types/permission-scheme-rule.type';
import { InputID } from 'src/workflow/inputs/create.input';
import { UseGuards } from '@nestjs/common';
import { PermissionKeys } from './decorators/permission-keys.decorator';
import { GetPermissionRulesBySchemeID } from './inputs/get-permission-scheme-rule.input';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UpdatePermissionSchemeRuleInput } from './inputs/update-permission-scheme.input';
import { AccessGuard } from 'src/common/guards/access.guard';
import { Roles, RolesEnum } from 'src/common/decotators/Roles.decorator';
import { IssueGuard } from 'src/issues/guards/issue.guard';


@Resolver(() => PermissionSchemeRule)
export class PermissionSchemeRulesResolver {
  constructor(private readonly permissionSchemeRulesService: PermissionSchemeRulesService) { }

  @UseGuards(AccessGuard)
  @PermissionKeys([PermissionSchemeKeys.ADMINISTER_PROJECTS])
  @Roles(RolesEnum.ADMINISTRATORS)
  @UseGuards(IssueGuard)
  @Query(() => [PermissionSchemeRuleType])
  async getPermissionRulesBySchemeID(@Args("InputID", { type: () => InputID }) input: InputID) {
    return await this.permissionSchemeRulesService.getPermissionRulesBySchemeID(input)
  }

  @UseGuards(AccessGuard)
  @PermissionKeys([PermissionSchemeKeys.ADMINISTER_PROJECTS])
  @Roles(RolesEnum.ADMINISTRATORS)
  //@UseGuards(ProjectGuard)
  @Query(() => [PermissionSchemeRuleType])
  async getPermissionRulesByProjectID(@Args("getPermissionRulesByProjectID", { type: () => InputID }) input: InputID) {
    return await this.permissionSchemeRulesService.getPermissionRulesByProjectID(input)
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => PermissionSchemeRuleType, { name: 'updatePermissionRule' })
  async updatePermissionRule(@Args('Input') input: UpdatePermissionSchemeRuleInput) {
    return await this.permissionSchemeRulesService.updatePermissionRule(input)
  }

}
