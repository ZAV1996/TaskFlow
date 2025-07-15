import { Global, Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowResolver } from './workflow.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { CondModule } from 'src/cond/cond.module';
import { Group } from 'src/groups/entities/group.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Status } from 'src/status/entities/status.entity';
import { Transition } from 'src/transition/entities/transition.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { User } from 'src/users/entities/user.entity';

@Global()
@Module({
  providers: [WorkflowResolver, WorkflowService],
  imports: [
    TypeOrmModule.forFeature([Workflow, Group, Project, Status, Transition, Issue, User]),
    GroupsModule,
    CondModule,
  ],
  exports: [
    WorkflowService
  ]
})
export class WorkflowModule { }
