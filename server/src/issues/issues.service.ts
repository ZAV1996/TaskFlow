import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { Repository, } from 'typeorm';
import { InputID } from 'src/workflow/inputs/create.input';
import { CreateIssueInput } from './inputs/create.input';
import { ProjectRelation, ProjectsService } from 'src/projects/projects.service';
import { ForbiddenError } from '@nestjs/apollo';
import { UpdateIssueInput } from './inputs/update.input';
import { ProjectComponent } from 'src/project-components/entities/project-component.entity';
import { ProjectComponentType } from 'src/project-components/types/project-component.type';
import { User } from 'src/users/entities/user.entity';
import { InputUser } from 'src/cond/inputs/user_cond.input';
import { FilterService } from 'src/filter/filter.service';
import { Project } from 'src/projects/entities/project.entity';
import { Status } from 'src/status/entities/status.entity';
import { IssueLinkService } from 'src/issue-link/issue-link.service';
import { ConditionItem, FilterInput, FunctionCall, LogicalOperator, Operator, SortOrder } from 'src/filter/inputs/filter.input';
import { IssueTypeService } from 'src/issue-type/issue-type.service';

@Injectable()
export class IssuesService {
    constructor(
        @InjectRepository(Issue) private issueRepo: Repository<Issue>,
        @InjectRepository(Status) private statusRepository: Repository<Status>,
        private typeService: IssueTypeService,
        private projectService: ProjectsService,
        private filterService: FilterService,
        private readonly issueLinkService: IssueLinkService,
    ) { }

    async getAllIssuesByProjectID({ ID }: InputID) {
        return await this.issueRepo.find({
            where: {
                project: { ID }
            },
            relations: [
                "issueType",
                "status",
                "author",
                "assignee",
                "parentIssue",
                "childrenIssues",
                "issueType",
                "issueType.workflow.statuses"
            ]
        })
    }

    async getIssueByID({ ID }: InputID) {
        return await this.issueRepo.findOne({ where: { ID }, relations: ["author", "assignee", "project", "parentIssue", "childrenIssues"] })
    }

    async createIssue(input: CreateIssueInput) {
        const count = await this.issueRepo.count({
            where: {
                project: { ID: input.project.ID }
            }
        }) + 1;
        const project = await this.projectService.getProjectByID(input.project.ID, [ProjectRelation.STATUSES, ProjectRelation.COMPONENTS])
        if (!project)
            throw new ForbiddenError("Выберите проект")

        const issue_type = await this.typeService.getIssueTypeByID(input.issueType.ID);
        if (!issue_type) throw new NotFoundException("Такой тип задачи не найден")
        const pr_issue_type = project.issueTypes.find(type => type.ID === issue_type?.ID);
        if (!pr_issue_type) throw new NotFoundException("В тeкущем проекте такой тип задачи не найден")

        const status = issue_type.workflow.statuses.find(status => status.is_initial);

        let assignee: InputUser | null = null
        if (!input.assignee) {
            assignee = this.getDefaultExecuterComponents(project, input)
        }
        else assignee = input.assignee

        const issue = this.issueRepo.create({ ...input, status: { ID: status!.ID }, key: project.key, issueNum: count, assignee: { ID: assignee?.ID }, issueType: { ID: issue_type.ID } });
        // if(!('parentIssue' in input))  
        return await this.issueRepo.save(issue)
        //return issue//await this.issueRepo.save({ ...input, status: { ID: status!.ID }, key: project.key, issueNum: count, assignee: { ID: assignee?.ID } })
    }



    async updateIssue(request: UpdateIssueInput & { key?: string }) {
        if ("project" in request) {
            const project = await this.projectService.getProjectByID(request.project?.ID!, [ProjectRelation.STATUSES])
            if (!project) throw new NotFoundException("Проект не найден")
            if (project) {
                request.key = project.key
                request.components = []
            }
            if (!("status" in request)) {
                throw new Error("Нельзя переместить задачу в другой проект, если не указан статус в котором будет находиться задача в другом проекте")
            }

            if ("issueType" in request) {
                const issue_type = await this.typeService.getIssueTypeByID(request.issueType!.ID!);
                if (!issue_type) throw new NotFoundException("Такой тип задачи не найден")
                const pr_issue_type = project.issueTypes.find(type => type.ID === issue_type?.ID);
                if (!pr_issue_type) throw new NotFoundException("В тeкущем проекте такой тип задачи не найден")

                const status = issue_type.workflow.statuses.find(status => status.is_initial);

                if (!pr_issue_type?.workflow.statuses.some(status => request.status.ID === status.ID))
                    throw new Error("Статус не принадлежит проекту в который вы хотите переместить задачу")
            }
        }
        const issue = await this.issueRepo.findOne({ where: { ID: request.ID }, relations: ["project", 'project.components.defaultExecuter', 'status'] })

        if (!issue) throw new NotFoundException("Проект не найден")
        if ('status' in request) {
            const newStatus = await this.statusRepository.findOne({
                where: { ID: request.status.ID },
            });
            if (!newStatus) {
                throw new NotFoundException(`Новый статус с ID ${request.status.ID} не найден.`);
            }
            await this.issueLinkService.validateStatusChange(request.ID, request.status.ID);
        }
        let assignee: InputUser | null = null
        if (!request.assignee) {
            assignee = this.getDefaultExecuterComponents(issue.project, request)
        }
        else assignee = request.assignee
        return await this.issueRepo.save({ ...issue, ...request, assignee: { ID: assignee?.ID } })
    }

    async updateIssueStatus() {

    }

    async deleteIssue({ ID }: InputID) {
        return await this.issueRepo.delete({ ID }) ? true : false
    }

    getDefaultExecuterComponents(project: Project, request: CreateIssueInput | UpdateIssueInput) {
        const components: ProjectComponent[] = []
        if (!project) throw new NotFoundException('Проект не найден')
        for (const component of project.components) {
            for (const item of request?.components ?? []) {
                if (component.ID === item.ID)
                    components.push(component)
                else continue
            }
        }
        if (components.length > 0) {
            components.sort((a, b) => {
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0
            })

        }
        return components.find(component => component.defaultExecuter)?.defaultExecuter ?? null
    }


    async filterIssues(filter: FilterInput, current_user: User) {
        const builder = this.issueRepo.createQueryBuilder('issue');
        builder.leftJoinAndSelect('issue.project', 'project')
        builder.leftJoinAndSelect('issue.author', 'author')
        builder.leftJoinAndSelect('issue.assignee', 'assignee')
        const whereParts: string[] = [];
        const parameters: Record<string, any> = {};
        let paramIndex = 0;

        // Обработка групп условий
        for (const [groupIndex, group] of filter.conditions.entries()) {
            const groupConditions: string[] = [];

            // Обработка условий внутри группы
            for (const [conditionIndex, condition] of group.conditions.entries()) {
                const paramName = `param_${groupIndex}_${conditionIndex}`;
                const { field, operator, functionCall } = condition;

                // Определение значения
                const value = this.getConditionValue(condition, current_user);

                // Построение условия
                let conditionStr = '';

                if (operator && functionCall) {
                    // Обработка специальных функций
                    switch (operator) {
                        case Operator.EQUALS:
                        case Operator.NOT_EQUALS:
                        case Operator.LESS_THAN:
                        case Operator.GREATER_THAN:
                        case Operator.LESS_THAN_OR_EQUAL:
                        case Operator.GREATER_THAN_OR_EQUAL:
                            conditionStr = `issue.${field} ${operator} ${functionCall} :${paramName}`;
                            parameters[paramName] = value;
                            break;
                        case Operator.IN:
                        case Operator.NOT_IN:
                            conditionStr = `issue.${field} ${operator} ${functionCall} (:...${paramName})`;
                            parameters[paramName] = value;
                            break;
                    }
                    conditionStr = this.handleFunctionCall(field, functionCall, value, paramName);
                } else if (operator && !functionCall) {
                    switch (operator) {
                        case Operator.EQUALS:
                        case Operator.NOT_EQUALS:
                        case Operator.LESS_THAN:
                        case Operator.GREATER_THAN:
                        case Operator.LESS_THAN_OR_EQUAL:
                        case Operator.GREATER_THAN_OR_EQUAL:
                            conditionStr = `issue.${field} ${operator} :${paramName}`;
                            parameters[paramName] = value;
                            break;
                        case Operator.IN:
                        case Operator.NOT_IN:
                            conditionStr = `issue.${field} ${operator} (:...${paramName})`;
                            parameters[paramName] = value;
                            break;
                        case Operator.IS_NULL:
                            conditionStr = `issue.${field} IS NULL`;
                            break;
                        case Operator.IS_NOT_NULL:
                            conditionStr = `issue.${field} IS NOT NULL`;
                            break;
                        case Operator.LIKE:
                            conditionStr = `issue.${field} LIKE :${paramName}`;
                            parameters[paramName] = value;
                            break;
                    }
                }
                if (conditionStr) groupConditions.push(conditionStr);
            }

            // Объединение условий группы
            if (groupConditions.length > 0) {
                const joined = groupConditions.join(` ${group.logicalOperator} `);
                whereParts.push(`(${joined})`);
            }
        }

        // Объединение всех групп
        if (whereParts.length > 0) {
            builder.where(whereParts.join(` ${filter.logicalOperator} `), parameters);
        }

        // Добавление сортировки
        if (filter.orderBy) {
            builder.orderBy(
                `issue.${filter.orderBy.field}`,
                filter.orderBy.orderBy || SortOrder.ASC
            );
        }
        return builder.getMany();
    }
    private getConditionValue(condition: ConditionItem, current_user: User): any {
        if (condition.functionCall === FunctionCall.CURRENT_USER) return current_user.ID;
        if (condition.valueInputID) return condition.valueInputID.ID;
        if (condition.valueInputIDArray) return condition.valueInputIDArray.map(id => id.ID);
        if (condition.valueNumber !== undefined) return condition.valueNumber;
        if (condition.valueArrayNumber !== undefined) return condition.valueArrayNumber;
        if (condition.valueString) return condition.operator !== Operator.LIKE ? condition.valueString : `%${condition.valueString}%`;
        return null;
    }

    private handleFunctionCall(field: string, functionCall: FunctionCall, valueInputIDArray: number[], paramName: string): string {
        switch (functionCall) {
            case FunctionCall.CURRENT_USER:
                return `issue.${field} = :${paramName}`;
            case FunctionCall.MEMBERS_OF:
                return `issue.${field} IN (SELECT userID FROM group_members where groupID IN (${valueInputIDArray}))`;
            case FunctionCall.NOW:
                return `issue.${field} = NOW()`;
            default:
                return '';
        }
    }
}


