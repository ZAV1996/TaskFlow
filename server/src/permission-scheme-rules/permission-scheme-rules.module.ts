import { Module } from '@nestjs/common';
import { PermissionSchemeRulesService } from './permission-scheme-rules.service';
import { PermissionSchemeRulesResolver } from './permission-scheme-rules.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionSchemeRule } from './entities/permission-scheme-rule.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  providers: [PermissionSchemeRulesResolver, PermissionSchemeRulesService],
  imports: [
    TypeOrmModule.forFeature([PermissionSchemeRule, Group, Project, Issue, User]),
  ],
  exports: [
    PermissionSchemeRulesService
  ]
})
export class PermissionSchemeRulesModule { }
