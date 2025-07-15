import { forwardRef, Module } from '@nestjs/common';
import { PermissionSchemeService } from './permission-scheme.service';
import { PermissionSchemeResolver } from './permission-scheme.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionScheme } from './entities/permission-scheme.entity';
import { Project } from 'src/projects/entities/project.entity';
import { PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { Group } from 'src/groups/entities/group.entity';
import { PermissionKey } from 'src/init/entities/PermissionKeys.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  providers: [PermissionSchemeResolver, PermissionSchemeService],
  imports: [
    TypeOrmModule.forFeature([PermissionScheme, Project, PermissionSchemeRule, Group, PermissionKey, Issue, User]),
  ],
})
export class PermissionSchemeModule { }
