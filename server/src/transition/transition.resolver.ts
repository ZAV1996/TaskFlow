import { Resolver, Query, Mutation, Args, Int, PartialType } from '@nestjs/graphql';
import { TransitionService } from './transition.service';
import { Transition } from './entities/transition.entity';
import { TransitionType } from './types/transition.type';

import { InputID } from 'src/workflow/inputs/create.input';
import PartialTransitionInput from './inputs/createOrUpdate.input';
import { PermissionSchemeRuleInput } from 'src/permission-scheme-rules/inputs/permission-scheme-rule.input';
import { TransitionPermissionSchemeRuleInput } from './inputs/rule.input';

@Resolver(() => Transition)
export class TransitionResolver {
  constructor(private readonly transitionService: TransitionService) { }

  @Query(() => [TransitionType])
  async getAllTransitionByStatus(@Args("StatusID", { description: "Идентификатор статуса", nullable: true }) { ID }: InputID) {
    return await this.transitionService.getAllTransitionByStatus(ID)
  }
  @Query(() => [TransitionType])
  async getAllTransitionsByWorkflowID(@Args("InputID", { description: "Идентификатор бизнесс-процесса", nullable: true }) { ID }: InputID) {
    return await this.transitionService.getAllTransitionsByWorkflowID(ID)
  }
  @Query(() => TransitionType)
  async getTransitionByID(@Args("ID", { description: "Идентификатор статуса", nullable: true, type: () => Int }) ID: number) {
    return await this.transitionService.getTransitionByID(ID)
  }

  @Mutation(() => TransitionType)
  async createTransition(@Args("createOrUpdateTransitionInput") input: PartialTransitionInput) {
    return await this.transitionService.createTransition(input);
  }
  @Mutation(() => TransitionType)
  async setATransitionRule(@Args("TransitionPermissionSchemeRule", { type: () => TransitionPermissionSchemeRuleInput }) input: TransitionPermissionSchemeRuleInput) {
    return await this.transitionService.setATransitionRule(input);
  }

  @Mutation(() => Boolean)
  async deleteTransition(@Args("Transition") input: InputID) {
    return await this.transitionService.deleteTransition(input);
  }
}
