import { forwardRef, Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusResolver } from './status.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Cond } from 'src/cond/entities/cond.entity';
import { CondModule } from 'src/cond/cond.module';
import { AuthModule } from 'src/auth/auth.module';
import { Project } from 'src/projects/entities/project.entity';
import { Workflow } from 'src/workflow/entities/workflow.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { User } from 'src/users/entities/user.entity';
import { StatusMeta } from './entities/status.meta.entity';

@Module({
  providers: [StatusResolver, StatusService,],//TransitionService
  imports: [
    TypeOrmModule.forFeature([Status, Cond, Project, Workflow, Group, Issue, User, StatusMeta]),//, Transition,
    forwardRef(() => CondModule),
    forwardRef(() => AuthModule),
  ],
  exports: [StatusService]
})
export class StatusModule { }
