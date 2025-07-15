import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transition } from './entities/transition.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from '@nestjs/apollo';
import PartialTransitionInput from './inputs/createOrUpdate.input';
import { Workflow } from 'src/workflow/entities/workflow.entity';
import { InputID } from 'src/workflow/inputs/create.input';
import { PermissionSchemeRuleInput } from 'src/permission-scheme-rules/inputs/permission-scheme-rule.input';
import { PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { TransitionPermissionSchemeRuleInput } from './inputs/rule.input';

@Injectable()
export class TransitionService {
  constructor(
    @InjectRepository(Transition) private transitionRepo: Repository<Transition>,
    @InjectRepository(PermissionSchemeRule) private ruleRepo: Repository<PermissionSchemeRule>,
    @InjectRepository(Workflow) private workflowRepo: Repository<Workflow>
  ) { }
  async createTransition(createTransitionInput: PartialTransitionInput) {
    const transition = await this.transitionRepo.findOne({ where: { parent: createTransitionInput.parent, to: createTransitionInput.to } });
    if (transition) throw new ForbiddenException("Такой переход уже существует")
    const wf1 = await this.workflowRepo.findOne({ where: { statuses: createTransitionInput.parent } })
    const wf2 = await this.workflowRepo.findOne({ where: { statuses: createTransitionInput.to } })
    if (wf1?.ID !== wf2?.ID) throw new ForbiddenException("Статусы принадлежат разным бизнесс процессам.")
    return await this.transitionRepo.save(createTransitionInput)
  }

  async getTransitionByID(ID: number) {
    return await this.transitionRepo.findOne({
      where: { ID },
      relations: [
        'to',
        'parent',
        'permission.user',
        'permission.group.users',
        'permission.projectRole.members.members',
      ],
    })
  }

  async setATransitionRule({ ID, ...input }: TransitionPermissionSchemeRuleInput) {
    const transition = await this.getTransitionByID(ID)
    if (!transition) throw new NotFoundException("Переход не найден")
    if (!transition.permission) {
      return await this.transitionRepo.save({
        ...transition, permission: {
          group: input.group,
          is_Assegnee: input.is_Assegnee,
          is_Project_Lead: input.is_Project_Lead,
          is_Owner: input.is_Owner,
          user: input.user,
          projectRole: input.projectRole
        }
      })
    } else {
      return await this.transitionRepo.save({
        ...transition, permission: {
          ...transition.permission,
          group: input.group,
          is_Assegnee: input.is_Assegnee,
          is_Project_Lead: input.is_Project_Lead,
          is_Owner: input.is_Owner,
          user: input.user,
          projectRole: input.projectRole
        }
      })
    }
  }


  async getAllTransitionByStatus(ID: number) {
    return await this.transitionRepo.find({ where: { parent: { ID } }, relations: ["to", "parent"] })
  }

  async getAllTransitionsByWorkflowID(ID: number) {
    return await this.transitionRepo.find({
      where: {
        parent: {
          parent: {
            ID,
          }
        }
      },
      relations: ["to", "parent", "transition_meta"]
    })
  }

  async deleteTransition(deleteTransitionInput: InputID) {
    return await this.transitionRepo.delete(deleteTransitionInput) ? true : false
  }
}
