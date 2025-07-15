import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesResolver } from './issues.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { FilterModule } from 'src/filter/filter.module';
import { Project } from 'src/projects/entities/project.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { Transition } from 'src/transition/entities/transition.entity';
import { Status } from 'src/status/entities/status.entity';
import { IssueLinkModule } from 'src/issue-link/issue-link.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [IssuesResolver, IssuesService],
  imports: [
    TypeOrmModule.forFeature([Issue, Project, Group, User, PermissionSchemeRule, Transition, Status]),
    FilterModule,
    ProjectsModule,
    IssueLinkModule,
    UsersModule
  ],
  exports: [
    IssuesService
  ]
})
export class IssuesModule { }
