import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { WorkflowModule } from 'src/workflow/workflow.module';
import { PermissionSchemeRulesService } from 'src/permission-scheme-rules/permission-scheme-rules.service';
import { PermissionSchemeRulesModule } from 'src/permission-scheme-rules/permission-scheme-rules.module';
import { PermissionSchemeModule } from 'src/permission-scheme/permission-scheme.module';
import { PermissionScheme } from 'src/permission-scheme/entities/permission-scheme.entity';
import { PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { Group } from 'src/groups/entities/group.entity';
import { PermissionKey } from 'src/init/entities/PermissionKeys.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { User } from 'src/users/entities/user.entity';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';

@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports: [
    TypeOrmModule.forFeature([Project, PermissionScheme, PermissionSchemeRule, Group, PermissionKey, Issue, User]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    WorkflowModule,
    ActivityLogModule
  ],
  exports: [ProjectsService],
})
export class ProjectsModule { }
