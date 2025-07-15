import { Module } from '@nestjs/common';
import { TransitionService } from './transition.service';
import { TransitionResolver } from './transition.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transition } from './entities/transition.entity';
import { Workflow } from 'src/workflow/entities/workflow.entity';
import { PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { TransitionMeta } from './entities/transition.meta.entity';

@Module({
  providers: [TransitionResolver, TransitionService],
  imports: [
    TypeOrmModule.forFeature([Transition, Workflow, PermissionSchemeRule, TransitionMeta])
  ],
  exports: [TransitionService]
})
export class TransitionModule { }
