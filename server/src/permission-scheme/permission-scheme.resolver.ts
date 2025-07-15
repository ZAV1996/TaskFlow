import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionSchemeService } from './permission-scheme.service';
import { PermissionScheme } from './entities/permission-scheme.entity';
import { CreatePermissionSchemeInput } from './inputs/create-permission-scheme.input';
import { PermissionSchemeType } from './types/permission-scheme.type';
import { InputID } from 'src/workflow/inputs/create.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AccessGuard } from 'src/common/guards/access.guard';


@Resolver(() => PermissionScheme)
export class PermissionSchemeResolver {
  constructor(private readonly permissionSchemeService: PermissionSchemeService) { }
  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => PermissionSchemeType, { nullable: true })
  async CreatePermissionScheme(@Args('Input') createProjectInput: CreatePermissionSchemeInput) {
    return await this.permissionSchemeService.createPermissionScheme(createProjectInput);
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => Boolean, { nullable: true })
  async UpdatePermissionScheme(@Args('Input') input: InputID) {
    return await this.permissionSchemeService.updatePermissionScheme(/*TODO*/);
  }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => Boolean, { nullable: true })
  async DeletePermissionScheme(@Args('Input') input: InputID) {
    return await this.permissionSchemeService.deletePermissionScheme(input);
  }
}
