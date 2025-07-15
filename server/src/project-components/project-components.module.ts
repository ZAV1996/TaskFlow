import { Module } from '@nestjs/common';
import { ProjectComponentsService } from './project-components.service';
import { ProjectComponentsResolver } from './project-components.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectComponent } from './entities/project-component.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { Group } from 'src/groups/entities/group.entity';

@Module({
  providers: [ProjectComponentsResolver, ProjectComponentsService],
  imports: [
    TypeOrmModule.forFeature([ProjectComponent, Project, User, Issue, Group]),
    ProjectsModule
  ],
  exports: [
    ProjectComponentsService
  ]
})
export class ProjectComponentsModule { }
