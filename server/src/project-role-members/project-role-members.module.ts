import { Module } from '@nestjs/common';
import { ProjectRoleMembersService } from './project-role-members.service';
import { ProjectRoleMembersResolver } from './project-role-members.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRoleMember } from './entities/project-role-member.entity';
import { Group } from 'src/groups/entities/group.entity';
import { PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Issue } from 'src/issues/entities/issue.entity';

@Module({
  providers: [ProjectRoleMembersResolver, ProjectRoleMembersService],
  imports: [
    TypeOrmModule.forFeature([ProjectRoleMember, Group, PermissionSchemeRule, Project, User, Issue])
  ]
})
export class ProjectRoleMembersModule { }
