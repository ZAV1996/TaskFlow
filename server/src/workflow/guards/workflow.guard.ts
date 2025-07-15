//import { ForbiddenError as ForbiddenException } from "@nestjs/apollo";
import { CanActivate, ExecutionContext, Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles, RolesEnum } from "src/common/decotators/Roles.decorator";
import { Group } from "src/groups/entities/group.entity";
import { PermissionKeys } from "src/permission-scheme-rules/decorators/permission-keys.decorator";
import { PermissionSchemeKeys, PermissionSchemeRule } from "src/permission-scheme-rules/entities/permission-scheme-rule.entity";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { In, Repository } from "typeorm";
import { InputID } from "src/workflow/inputs/create.input";
import { UpdateIssueInput } from "src/issues/inputs/update.input";
import { Transition } from "src/transition/entities/transition.entity";
import { Issue } from "src/issues/entities/issue.entity";
import { Status } from "src/status/entities/status.entity";
import { SessionService } from "src/session/session.service";


@Injectable()
export class WorkflowGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
        @InjectRepository(Transition) private readonly transitionRepo: Repository<Transition>,
        @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
        @InjectRepository(PermissionSchemeRule) private readonly ruleRepo: Repository<PermissionSchemeRule>,
        private sessionService: SessionService
    ) { }

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const Role = this.reflector.get(Roles, context.getHandler());
        const session_uuid = context.getArgByIndex(2).req.cookies.session_uuid
        const session = await this.sessionService.getSessionBySessionUUID(session_uuid)!;
        const user = session!.user!
        const request: unknown = ctx.getArgs().Input
        const fieldName = ctx.getInfo().fieldName;
        let assignee: User | null;
        let project: Project | null = null;
        let transition: Transition | null = null;
        let issue: Issue | null = null;
        let status: Status | null = null;
        let rule: PermissionSchemeRule | null = null;

        if (fieldName === 'updateIssue' && this.isUpdateIssueInput(request) && 'status' in request) {
            if (Role === RolesEnum.ADMINISTRATORS) {
                if (await this.checkAdministrator(user)) return true
            }
            issue = await this.issueRepo.findOne({ where: { ID: request.ID }, relations: ['status', 'project', 'assignee'] })
            if (!issue) throw new NotFoundException("Задача не найдена");
            if (issue.assignee)
                assignee = issue.assignee;
            status = issue.status;
            project = issue.project;
            transition = await this.transitionRepo.findOne({
                where: {
                    parent: status,
                    to: request.status
                },
                relations: ['permission']
            })
            if (!transition) throw new NotFoundException('Переход не найден');
            if (!transition.permission) return true
            rule = await this.ruleRepo.findOne({
                where: { ID: transition.permission?.ID }, relations: [
                    'user', 'group.users', 'projectRole.members.members'
                ]
            })
            if (!rule) return true
            const result = this.checkPermission(rule, project, user, issue)
            if (!result) throw new ForbiddenException('Вы не имеете прав на переход на этот статус')
        }
        return true;
    }

    async checkAdministrator(user: User) {
        const group = await this.groupRepo.findOne({ where: { group_name: "Administrators" }, relations: ["users"] })
        if (group?.users.some(member => member.ID === user.ID)) return true
    }

    checkPermission(permission: PermissionSchemeRule, target: Project, user: User, issue: Issue | null = null) {
        // Проверка на кналичие правила
        if (!permission) return false;

        // Проверка на исполнителя
        if (permission.is_Assegnee && issue?.assignee?.ID === user.ID) return true;

        // Проверка на автора
        if (permission.is_Owner && issue?.author?.ID === user.ID) return true;

        // Проверка на проектного лидера
        if (permission.is_Project_Lead && target.lead.ID === user.ID) return true;

        // Проверка наличия пользователя в списке пользователей которым дано право
        if (permission.user.some(item => item.ID === user.ID)) return true

        // Проверка наличия пользователя в группах которым дано право
        const isInGroup = permission.group.some(Group =>
            Group.users.some(group_user => group_user.ID === user.ID)
        );
        if (isInGroup) return true

        // Проверка наличия пользователя в ролях проекта которым дано право
        const isInProjectRole = permission.projectRole.some(role =>
            role.members.some(member =>
                member.project.ID === target.ID &&
                member.members.some(user_member => user_member.ID === user.ID)
            )
        );
        if (isInProjectRole) return true
        return false
    }

    isUpdateIssueInput(obj: unknown): obj is UpdateIssueInput {
        return typeof obj === 'object' && obj !== null && 'ID' in obj
    }

    isHasInputID(obj: unknown): obj is InputID {
        return typeof obj === 'object' && obj !== null && 'ID' in obj
    }

}