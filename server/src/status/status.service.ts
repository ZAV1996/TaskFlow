import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { CreateOrUpdateStatusInput } from './inputs/createOrUpdate.input';
import { Path } from '@nestjs/config';
import { CondService } from 'src/cond/cond.service';
import { InputID } from 'src/workflow/inputs/create.input';
// import { TransitionService } from 'src/transition/transition.service';
import { Workflow } from 'src/workflow/entities/workflow.entity';
import { ForbiddenError } from '@nestjs/apollo';
import { LinkType } from 'src/issue-link/entities/issue-link.entity';
import { StatusStyleVariant } from './entities/status.meta.entity';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private statusRepo: Repository<Status>,
        @InjectRepository(Workflow) private workflowRepo: Repository<Workflow>,
        private condService: CondService,
    ) { }

    async getWorkflowStatuses(input: InputID) {
        return await this.statusRepo.find({ where: { parent: input }, relations: ['status_meta'] })
    }

    async createStatus(input: CreateOrUpdateStatusInput) {
        // 1. Ищем бизнесс-процесс. Если не найден - выбрасываем ошибку.
        const workflow = await this.workflowRepo.findOne({ where: { ID: input.parent.ID }, relations: ["statuses"] })
        if (!workflow) throw new NotFoundException("Workflow не найден");

        //2. Выносим статусы в отделбную переменную.
        const { statuses } = workflow;

        //3. Проверяем уникальность названия статуса.
        if (statuses.some(s => s.title === input.title))
            throw new ForbiddenError("Статус с таким названием уже существует");

        //4. Проверяем атрибуты нового статуса. 
        if (input.is_finished && (input.is_initial || input.on_process))
            throw new Error("Завершённый статус не может быть начальным или находиться в процессе");

        //5. Сбрасываем атрибуты у существующих статусов есть новый статус имеет атрибуты уникальные для бизнесс-процесса.
        if (input.is_initial) this.resetExistingInitial(statuses);
        if (input.is_finished) this.resetExistingFinished(statuses);

        if (!input.is_initial && !input.is_finished) {
            input.on_process = true
            this.setAllNonSpecialToProcessing(statuses);
        }

        statuses.push(this.statusRepo.create(input));

        await this.workflowRepo.manager.transaction(async manager => {
            return manager.save(workflow);
        })

        return await this.getWorkflowStatuses(input.parent)
    }

    async updateStatus(input: CreateOrUpdateStatusInput) {
        const statuses = await this.statusRepo.find({
            where: {
                parent: input.parent
            },
            relations: ['status_meta']
        })
        const status = statuses.find(st => st.ID === input.ID)
        if (!status) throw new NotFoundException("Статус не найден")
        if ('status_meta' in input) {
            if (input.status_meta?.posX)
                status.status_meta.posX = input.status_meta?.posX

            if (input.status_meta?.posY)
                status.status_meta.posY = input.status_meta?.posY

            if (input.status_meta?.variant)
                status.status_meta.variant = input.status_meta?.variant

        }

        if (input.is_initial) {
            const initial_st = statuses.find(st => st.is_initial)!
            console.log(initial_st.is_initial);
        }
        return await this.statusRepo.save(status)
    }

    // Вспомогательные методы для сброса флагов
    private resetExistingInitial(statuses: Status[]) {
        const existingInitial = statuses.find(s => s.is_initial);
        if (existingInitial) existingInitial.is_initial = false;
    }

    private resetExistingFinished(statuses: Status[]) {
        const existingFinished = statuses.find(s => s.is_finished);
        if (existingFinished) existingFinished.is_finished = false;
    }

    // Установка on_process для всех неспециальных статусов
    private setAllNonSpecialToProcessing(statuses: Status[]) {
        statuses.forEach(s => {
            s.on_process = !s.is_initial && !s.is_finished;
        });
    }



    async getAllStatusesByProjectID(input: InputID) {

        return await this.statusRepo.find(
            {
                where: {
                    parent: {
                        issueType: {
                            project: input
                        }
                    }
                },
                relations: ["parent", "transitions"],
                cache: true
            }
        )
    }

    async deleteStatus({ ID }: InputID) {
        return await this.statusRepo.delete({ ID }) ? true : false
    }
}

