import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { Repository } from 'typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { CreateWorkflowInput, InputID, UpdateWorkflowInput } from './inputs/create.input';
import { StatusService } from 'src/status/status.service';
import { CondService } from 'src/cond/cond.service';
import { Status } from 'src/status/entities/status.entity';
// import { TransitionService } from 'src/transition/transition.service';
import { ForbiddenError } from '@nestjs/apollo';
import { Transition } from 'src/transition/entities/transition.entity';
import { StatusStyleVariant } from 'src/status/entities/status.meta.entity';
import { HandleTypeID } from 'src/transition/entities/transition.meta.entity';
// import { Transition } from 'src/transition/entities/transition.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow) private workflowRepo: Repository<Workflow>,
    @InjectRepository(Status) private statusRepo: Repository<Status>,
    @InjectRepository(Transition) private transitionRepo: Repository<Transition>,
  ) { }

  async create_workflow(input: CreateWorkflowInput) {
    const wf = await this.workflowRepo.findOneBy(input);
    if (wf) throw new ForbiddenException("Бизнес процесс с таким названием уже существует")
    const statuses = this.statusRepo.create([
      {
        title: "Назначено",
        is_initial: true,
        status_meta: {
          posX: 0,
          posY: 0,
          variant: StatusStyleVariant.DEFAULT
        }
      },
      {
        title: "В работе",
        on_process: true,
        status_meta: {
          posX: 100,
          posY: 0,
          variant: StatusStyleVariant.WARNING
        }
      },
      {
        title: "Выполнено",
        is_finished: true,
        status_meta: {
          posX: 200,
          posY: 0,
          variant: StatusStyleVariant.SUCCESS
        }
      },
    ])
    const workflowEntity = this.workflowRepo.create({
      title: input.title,
      description: input.description,
      statuses
    })

    const workflow = await this.workflowRepo.manager.transaction(async manager => {
      return await manager.save(workflowEntity);
    });

    await this.transitionRepo.save([
      {
        title: 'В работу',
        parent: workflow.statuses[0],
        to: workflow.statuses[1],
        transition_meta: {
          sourceHandle: HandleTypeID.SR,
          targetHandle: HandleTypeID.TL
        }
      },
      {
        title: 'Завершить',
        parent: workflow.statuses[1],
        to: workflow.statuses[2],
        transition_meta: {
          sourceHandle: HandleTypeID.SR,
          targetHandle: HandleTypeID.TL
        }
      },
    ])
    return workflow
  }

  async updateWorkflow(input: UpdateWorkflowInput) {
    return await this.workflowRepo.save(input)
  }


  async delete_workflow({ ID }: InputID) {
    const projects = await this.workflowRepo.find({
      where: {
        issueType: {
          workflow: {
            ID
          }
        }
      }
    })
    if (projects.length !== 0) throw new ForbiddenError("Данный бизнесс-процесс нельзя удалить так как он используется в других проектах")
    return (await this.workflowRepo.delete({ ID })) ? true : false
  }



  async getWorkflowByID({ ID }: InputID) {
    return await this.workflowRepo.findOne({ relations: ["statuses"], where: { ID } })
  }
  async getWorkflowByProjectID({ ID }: InputID) {
    return await this.workflowRepo.findOne({ relations: ["statuses", "parent"], where: { issueType: { project: { ID } } }, cache: false })
  }

  async getAllWorkflows() {
    return await this.workflowRepo.find({ relations: ['statuses.transitions'] })
  }

  async getAllWorkflowsByProjectID({ ID }: InputID) {
    return await this.workflowRepo.find({
      where: {
        issueType: {
          project: {
            ID
          }
        }
      },
      relations: ["issueType"]
    })
  }

  



}
