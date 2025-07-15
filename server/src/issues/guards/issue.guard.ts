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
import { Issue } from "../entities/issue.entity";
import { CreateIssueInput } from "../inputs/create.input";
import { UpdateIssueInput } from "../inputs/update.input";
import { InputID } from "src/workflow/inputs/create.input";
import { UpdateProjectInput } from "src/projects/inputs/update-project.input";
import { CreateProjectComponentInput } from "src/project-components/inputs/create.input";
import { ProjectComponent } from "src/project-components/entities/project-component.entity";
import { RedisService } from "src/redis/redis.service";
import { TSession } from "src/session/session.service";


@Injectable()
export class IssueGuard implements CanActivate {
    private readonly relationsIssue = [
        "status",
        "project.permissionScheme",
        "project.permissionScheme.permissionSchemeRule",
        "project.permissionScheme.permissionSchemeRule.permissionKey",
        "project.permissionScheme.permissionSchemeRule.user",
        "project.permissionScheme.permissionSchemeRule.projectRole.members.members",
        "project.permissionScheme.permissionSchemeRule.projectRole.members.project",
        "project.permissionScheme.permissionSchemeRule.group.users",
        "project.lead",
        "project.issue_types.workflow.statuses",
        "project.components",
        "project.components.defaultExecuter"
    ]
    private readonly relationsProject = [
        "permissionScheme",
        'components.defaultExecuter',
        "permissionScheme.permissionSchemeRule",
        "permissionScheme.permissionSchemeRule.permissionKey",
        "permissionScheme.permissionSchemeRule.user",
        "permissionScheme.permissionSchemeRule.projectRole.members.members",
        "permissionScheme.permissionSchemeRule.projectRole.members.project",
        "permissionScheme.permissionSchemeRule.group.users",
        "lead",
        "issueTypes.workflow",
        "issueTypes.workflow.statuses",
        "components"
    ]
    constructor(
        private reflector: Reflector,
        @InjectRepository(Project) private readonly projectRepo: Repository<Project>,
        @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
        @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private redisService: RedisService
    ) { }

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const keys = this.reflector.get(PermissionKeys, context.getHandler());
        const Role = this.reflector.get(Roles, context.getHandler());
        const session_uuid = context.getArgByIndex(2).req.cookies.session_uuid;
        const user = (await this.redisService.get<TSession>(`session:${session_uuid}`)!)?.user!
        const request: unknown = ctx.getArgs().Input
        const fieldName = ctx.getInfo().fieldName;
        let assignee: User | null = null;
        let issue: Issue | null = null;
        let project: Project | null = null;


        if (fieldName === "updateProject" && this.isUpdateProjectInput(request)) {
            project = await this.projectRepo.findOne({ where: { ID: request.ID }, relations: this.relationsProject })
        }
        if (fieldName === "getProjectByID" && isHasInputID(request)) {
            project = await this.projectRepo.findOne({ where: { ID: request.ID }, relations: this.relationsProject, cache: 2000 })
        }
        if (fieldName === "deleteProject" && isHasInputID(request)) {
            project = await this.projectRepo.findOne({ where: { ID: request.ID }, relations: this.relationsProject })
        }

        if (fieldName === "getWorkflowByProjectID" && isHasInputID(request)) {
            project = await this.projectRepo.findOne({ where: { ID: request.ID }, relations: this.relationsProject })
        }

        if (fieldName === "getAllStatusesByProjectID" && isHasInputID(request)) {
            project = await this.projectRepo.findOne({ where: { ID: request.ID }, relations: this.relationsProject })
        }

        if (fieldName === "getAllIssuesByProjectID" && isHasInputID(request)) {
            project = await this.projectRepo.findOne({ where: { ID: request.ID }, relations: this.relationsProject })
        }
        if (fieldName === "getIssueByID" && isHasInputID(request)) {
            issue = await this.issueRepo.findOne({ where: { ID: request.ID }, relations: this.relationsIssue })
            if (!issue) throw new NotFoundException("Задача не найдена")
            project = issue?.project
        }
        if (fieldName === 'createProjectComponent' && this.isCreateProjectComponentInput(request)) {
            if ('defaultExecuter' in request) {
                project = await this.projectRepo.findOne({ where: { ID: request.parent.ID }, relations: this.relationsProject })
                if (!project) throw new NotFoundException('Проект не найден')
                assignee = await this.userRepo.findOne({ where: { ID: request.defaultExecuter.ID } })
                if (!assignee) throw new NotFoundException('Пользователь не найден')
            } else return true
        }

        if (fieldName === "createIssue" && this.isCreateIssueInput(request)) {
            project = await this.projectRepo.findOne({ where: { ID: request.project!.ID }, relations: this.relationsProject })
            if (!project) throw new NotFoundException('Проект не найден')

            assignee = this.getDefaultExecuterComponents(project, request)//components.find(component => component.defaultExecuter)?.defaultExecuter ?? null
            if (request.assignee)
                assignee = await this.userRepo.findOne({ where: { ID: request.assignee.ID } });
            issue = this.issueRepo.create(request)
        }
        if (fieldName === "updateIssue" && this.isUpdateIssueInput(request)) {
            issue = await this.issueRepo.findOne({
                where: {
                    ID: request.ID,
                    project: {
                        permissionScheme: {
                            permissionSchemeRule: {
                                permissionKey: {
                                    permissionKey: In(keys)
                                }
                            }
                        }
                    }
                },
                relations: this.relationsIssue,
                cache: false
            })
            if (!issue) throw new NotFoundException("Задача не найдена")
            project = issue.project
            assignee = this.getDefaultExecuterComponents(project, request)
            if (request.assignee)
                assignee = await this.userRepo.findOne({ where: { ID: request.assignee.ID } });

            if (request.project) {
                if (issue.project.ID !== request.project?.ID) {
                    if (await this.checkAdministrator(user)) return true
                    else throw new ForbiddenException("Вы не можете переместить задачу в другой проект")
                }
            }
        }
        if (fieldName === "deleteIssue" && isHasInputID(request)) {
            issue = await this.issueRepo.findOne({
                where: {
                    ID: request.ID,
                    project: {
                        permissionScheme: {
                            permissionSchemeRule: {
                                permissionKey: {
                                    permissionKey: In(keys)
                                }
                            }
                        }
                    }
                },
                relations: this.relationsIssue,
                cache: false
            })
            if (!issue) throw new NotFoundException("Задача не найдена")
            project = issue.project
        }
        if (!project) throw new ForbiddenException("Проект не найден")


        if (Role === RolesEnum.ADMINISTRATORS) {
            if (await this.checkAdministrator(user)) return true
        }

        const permissionChecks: { [key: string]: (rule: PermissionSchemeRule, project: Project, user: User) => void } = {
            [PermissionSchemeKeys.ADMINISTER_PROJECTS]: (rule, project, user,) => {
                const result = this.checkPermission(rule, project, user);
                if (!result) throw new ForbiddenException("У вас нет прав на администрирование этого проекта");
            },
            [PermissionSchemeKeys.BROWSE_PROJECTS]: (rule, project, user,) => {
                const result = this.checkPermission(rule, project, user);

                if (!result) throw new ForbiddenException("У вас нет прав на просмотр этого проекта");
            },
            [PermissionSchemeKeys.MANAGE_SPRINTS_PERMISSION]: (rule, project, user,) => {
                const result = this.checkPermission(rule, project, user);
                if (!result) throw new ForbiddenException("У вас нет прав на управление спринтами этого проекта");
            },
            [PermissionSchemeKeys.VIEW_READONLY_WORKFLOW]: (rule, project, user,) => {
                const result = this.checkPermission(rule, project, user);
                if (!result) throw new ForbiddenException("У вас нет прав на просмотр бизнес-процесса этого проекта");
            },
            //////////////////////////////////////////////////////////////////////////////////
            [PermissionSchemeKeys.CREATE_ISSUES]: (rule, project, user) => {
                const result = this.checkPermission(rule, project, user);
                if (!result) throw new ForbiddenException("Вы не имеете права создавать задачи в этом проекте");
            },
            [PermissionSchemeKeys.MODIFY_AUTHOR]: (rule, project, user) => {
                if (!issue) throw new ForbiddenException("Задача найдена")
                if (this.isUpdateIssueInput(request)) {
                    if ('author' in request && request.author?.ID !== issue.author.ID) {
                        if (!this.checkPermission(rule, project, user, issue))
                            throw new ForbiddenException("Вы не имеете права изменять автора задачи");
                    }
                }
            },
            [PermissionSchemeKeys.ASSIGN_ISSUES]: (rule, project, user) => {
                if (!issue) throw new ForbiddenException("Задача найдена")
                if (issue.assignee && (user.ID !== issue.assignee.ID)) {
                    const result = this.checkPermission(rule, project, user, issue);
                    if (!result) throw new ForbiddenException("Вы не имеете права назначать задачи другим пользователям");
                }
            },
            [PermissionSchemeKeys.CLOSE_ISSUES]: (rule, project, user) => {
                if (!issue) throw new ForbiddenException("Задача найдена")
                const result = this.checkPermission(rule, project, user, issue);
                if (!result) throw new ForbiddenException("У вас нет прав завершать задачи в этом проекте");
            },
            [PermissionSchemeKeys.ASSIGNABLE_USER]: (rule, project) => {
                if (fieldName === 'createProjectComponent' && this.isCreateProjectComponentInput(request) && 'defaultExecuter' in request && assignee) {
                    const result = this.checkPermission(rule, project, assignee);
                    if (!result) throw new ForbiddenException(`Пользователь ${assignee.surname} ${assignee.name} ${assignee.patronymic} не может быть назначенным в качестве исполнителя`);
                }
                if (fieldName === "updateIssue" && this.isUpdateIssueInput(request)) {
                    if (assignee) {
                        const result = this.checkPermission(rule, project, assignee, issue);
                        if (!result) throw new ForbiddenException(`Пользователь ${assignee.surname} ${assignee.name} ${assignee.patronymic} не может быть назначенным в качестве исполнителя`);
                    }
                }
                if (fieldName === "createIssue" && this.isCreateIssueInput(request)) {
                    if (assignee) {
                        const result = this.checkPermission(rule, project, assignee, issue);
                        if (!result) throw new ForbiddenException(`Пользователь ${assignee.surname} ${assignee.name} ${assignee.patronymic} не может быть назначенным в качестве исполнителя`);
                    }
                }
            },
            [PermissionSchemeKeys.EDIT_ISSUES]: (rule, project, user) => {
                const result = this.checkPermission(rule, project, user, issue);
                if (!result) throw new ForbiddenException("Вы не имеете права редактировать задачи в этом проекте");
            },
            [PermissionSchemeKeys.TRANSITION_ISSUES]: (rule, project, user) => {
                if (fieldName === 'updateIssue' && this.isUpdateIssueInput(request) && 'status' in request) {
                    const issue_type = request.issueType;
                    const pr_issue_type = project.issueTypes.find(type => type.ID === issue_type?.ID);
                    if (!pr_issue_type) throw new NotFoundException("В тeкущем проекте такой тип задачи не найден")
                    if (!pr_issue_type.workflow.statuses.find(status => status.ID === request.status.ID))
                        throw new NotFoundException("В тeкущем бизнесс процессе такой статус не найден")
                    const result = this.checkPermission(rule, project, user, issue);
                    if (!result) throw new ForbiddenException("Вы не имеете права менять статусы задач в этом проекте");
                }
            },
            [PermissionSchemeKeys.LINK_ISSUES]: (rule, project, user) => {
                if (!issue) throw new ForbiddenException("Задача найдена")
                if (!issue.project) {
                    const result = this.checkPermission(rule, project, user, issue);
                    if (!result) throw new ForbiddenException("Вы не имеете права связывать задачи, и создавать связанные задачи");
                }
            },
            [PermissionSchemeKeys.CREATE_ATTACHMENTS]: (rule, project, user) => {
                if (!issue) throw new ForbiddenException("Задача найдена")
                if (!issue.project) {
                    const result = this.checkPermission(rule, project, user, issue);
                    if (!result) throw new ForbiddenException("Вы не имеете права создавать вложения в этом проекте");
                }
            },
            [PermissionSchemeKeys.DELETE_ALL_ATTACHMENTS]: (rule, project, user) => {
                if (!issue) throw new ForbiddenException("Задача найдена")
                if (!issue.project) {
                    const result = this.checkPermission(rule, project, user, issue);
                    if (!result) throw new ForbiddenException("Вы не имеете права удалять любые вложения в этом проекте");
                }
            },
            [PermissionSchemeKeys.DELETE_OWN_ATTACHMENTS]: (rule, project, user) => {
                if (!issue) throw new ForbiddenException("Задача найдена")
                if (!issue.project) {
                    const result = this.checkPermission(rule, project, user, issue);
                    if (!result) throw new ForbiddenException("Вы не имеете права удалять свои вложения в этом проекте");
                }
            },
            [PermissionSchemeKeys.DELETE_ISSUES]: (rule, project, user) => {
                const result = this.checkPermission(rule, project, user, issue);
                if (!result) throw new ForbiddenException("Вы не имеете права удалять задачи в этом проекте");
            }
        }


        for (const key of keys) {
            const rule = project.permissionScheme.permissionSchemeRule.find(rule => rule.permissionKey.permissionKey === key)!
            if (rule && permissionChecks[key]) {
                permissionChecks[key](rule, project, user);
            }
        }
        return true;
    }

    async checkAdministrator(user: User) {
        const group = await this.groupRepo.findOne({ where: { group_name: "Administrators" }, relations: ["users"] })
        if (group?.users.some(member => member.ID === user.ID)) return true
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

    isCreateIssueInput(obj: unknown): obj is CreateIssueInput {
        return typeof obj === 'object' && obj !== null && 'title' in obj && 'project' in obj && 'author' in obj;
    }


    isUpdateProjectInput(obj: unknown): obj is UpdateProjectInput {
        return typeof obj === 'object' && obj !== null && 'ID' in obj
    }

    isCreateProjectComponentInput(obj: unknown): obj is CreateProjectComponentInput {
        return typeof obj === 'object' && obj !== null && 'title' in obj
    }
}
export function isHasInputID(obj: unknown): obj is InputID {
    return typeof obj === 'object' && obj !== null && 'ID' in obj
}