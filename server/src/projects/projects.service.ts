import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { FindOperator, In, Like, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ForbiddenError } from '@nestjs/apollo';
import { User } from 'src/users/entities/user.entity';
import { join } from 'path';
import { WorkflowService } from 'src/workflow/workflow.service';
import { PermissionSchemeService } from 'src/permission-scheme/permission-scheme.service';
import { PermissionSchemeRulesService } from 'src/permission-scheme-rules/permission-scheme-rules.service';
import { PermissionSchemeKeys, PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { PermissionScheme } from 'src/permission-scheme/entities/permission-scheme.entity';
import { CreatePermissionSchemeInput } from 'src/permission-scheme/inputs/create-permission-scheme.input';
import { UpdatePermissionSchemeRuleInput } from 'src/permission-scheme-rules/inputs/update-permission-scheme.input';
import { CreatePermissionSchemeRuleInput } from 'src/permission-scheme-rules/inputs/create-permission-scheme-rule.input';
import { PermissionKey } from 'src/init/entities/PermissionKeys.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { Operator } from 'src/filter/inputs/filter.input';
import { take, timestamp } from 'rxjs';
import { InputID } from 'src/workflow/inputs/create.input';
import { isHasInputID } from 'src/issues/guards/issue.guard';
import { ActivityLog } from 'src/activity-log/entities/activity-log.entity';
import { FileService } from 'src/file/file.service';
import { FileEntity } from 'src/file/entities/file.entity';
import { FileType, RelatedEntityType } from 'src/file/input/upload-file.input';
import { IssueTypeService } from 'src/issue-type/issue-type.service';
export enum ProjectRelation {
  LEAD = "lead",
  TRANSITION_ISSUES = 'issueTypes.workflow.statuses.transitions',
  COMPONENTS = 'components',
  PermissionScheme = "permissionScheme",
  Issues = "issues",
  Workflow = "issueTypes.workflow",
  STATUSES = "issueTypes.workflow.statuses",
  Image = "image"
}
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private userServive: UsersService,
    private workflowService: WorkflowService,
    private activityLogService: ActivityLogService,
    private fileService: FileService,
    private typeService: IssueTypeService,
    @InjectRepository(PermissionScheme) private readonly permissionRepo: Repository<PermissionScheme>,
    @InjectRepository(PermissionSchemeRule) private readonly ruleRepo: Repository<PermissionSchemeRule>,
    @InjectRepository(PermissionKey) private readonly permissionKeyRepo: Repository<PermissionKey>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
  ) { }

  //TODO - Надо разбить метод на методы
  async createProject(createProjectInput: CreateProjectInput) {

    let project_image: FileEntity | undefined = undefined

    const user = await this.userServive.getUserByID(createProjectInput.lead);
    if (!user)
      throw new ForbiddenError("Пользователь не найден");

    const pr = await this.projectRepository.findOneBy([{ key: createProjectInput.key }, { project_name: createProjectInput.project_name }])
    if (pr) {
      throw new ForbiddenError("Проект с таким ключом или именем уже существует")
    }

    const workflow = await this.workflowService.create_workflow({ title: `Workflow проекта ${createProjectInput.project_name}` })


    const group = await this.groupRepo.findOneBy({ group_name: "Administrators" })

    ///////////////////////////////TODO вынести в родные сервисыы/////////////////////////////////////////////////
    const keys = (await this.permissionKeyRepo.find()).map(item => {
      if (
        item.permissionKey === PermissionSchemeKeys.BROWSE_PROJECTS ||
        item.permissionKey === PermissionSchemeKeys.ADMINISTER_PROJECTS ||
        item.permissionKey === PermissionSchemeKeys.VIEW_READONLY_WORKFLOW ||
        item.permissionKey === PermissionSchemeKeys.CREATE_ISSUES ||
        item.permissionKey === PermissionSchemeKeys.ASSIGN_ISSUES ||
        item.permissionKey === PermissionSchemeKeys.ASSIGNABLE_USER ||
        item.permissionKey === PermissionSchemeKeys.MANAGE_SPRINTS_PERMISSION
      ) {
        return {
          permissionKey: item,
          is_Project_Lead: true,
          group: [group]
        } as PermissionSchemeRule
      } else return { permissionKey: item }
    })
    const rules = await this.ruleRepo.save(keys)

    const permissionScheme = await this.permissionRepo.save({
      name: createProjectInput.project_name,
      description: `Схема прав доступа проекта ${createProjectInput.project_name}`,
      permissionSchemeRule: rules
    })

    const image = await createProjectInput.image;
    if (image)
      project_image = await this.fileService.uploadFile(image, {
        type: FileType.PROJECT_IMAGE,
        uploadedBy: user,
        relatedEntityType: RelatedEntityType.PROJECT,
      })
    const projectEntity = this.projectRepository.create({
      key: createProjectInput.key,
      description: createProjectInput.description,
      project_name: createProjectInput.project_name,
      lead: user,
      permissionScheme,
      image: project_image
    })

    const project = await this.projectRepository.manager.transaction(async manager => {
      return await manager.save(projectEntity);
    })
    const issue_type = await this.typeService.createIssueType({
      name: "Задача",
      workflow: workflow,
      icon_url: "",
      project: project
    })
    return { ...project, image: project_image, issue_types: [issue_type] }
  }

  async updateProject(updateProjectInput: UpdateProjectInput) {
    const project = await this.projectRepository.findOne({ relations: ["lead", "workflow", "issues"], where: { ID: updateProjectInput.ID } })
    if (!project)
      throw new ForbiddenError("Проект не найден")
    if (updateProjectInput.lead !== undefined) {
      const candidate = await this.userServive.getUserByID(updateProjectInput.lead)
      if (candidate) {
        project.lead = candidate
      }
    }
    if (updateProjectInput.key && (updateProjectInput.key !== project.key)) {
      for (const Issue of project.issues) {
        Issue.key = updateProjectInput.key
      }
    }
    return await this.projectRepository.save({
      ...project,
      description: updateProjectInput.description,
      project_name: updateProjectInput.project_name,
      key: updateProjectInput.key,
      lead: project.lead
    })
  }

  async deleteProject(ID: number) {
    const project = await this.getProjectByID(ID);
    if (!project) {
      throw new ForbiddenError("Проект не найден")
    }
    return await this.projectRepository.delete({ ID })
  }

  async getAvailableProjects(user: User, page: number = 1, limit: number = 10) {
    const IDs: number[] = await this.getContainsUserPermissionSchemes(PermissionSchemeKeys.BROWSE_PROJECTS, user)
    if (IDs.length === 0) {
      return [];
    }
    const builder = this.projectRepository.createQueryBuilder("project");
    builder.leftJoinAndSelect('project.lead', "lead")
    builder.leftJoinAndSelect('project.image', "image")
      .where('project.permissionScheme IN(:...IDs)', { IDs })
      .skip((page - 1) * limit)
      .take(limit)
      .cache(true)
    const projects = await builder.getMany()
    return projects
  }

  async getRecentProjects(user: User) {
    const logs = await this.activityLogService.activityLogRepository.find({
      where: [
        {
          handlerName: 'getAllIssuesByProjectID',
          user: {
            ID: user.ID
          },
        },
        {
          handlerName: 'getProjectByID',
          user: {
            ID: user.ID
          },
        },
      ],
      order: {
        timestamp: "DESC"
      },
      take: 100
    })
    const projects: Project[] = []
    const ids = uniqueObjects(logs.map(log => JSON.parse(log.argument!) as { Input: InputID }).map(item => item.Input.ID));
    if (ids.length === 0) {
      return await this.getAvailableProjects(user, 1, 5);
    }

    const availableProjects = await this.getAvailableProjects(user, 1, 0);
    ids.forEach(item => {
      const project = availableProjects.find(project => project.ID === item)
      if (project)
        projects.push(project)
    })
    if (projects.length === 0) {
      if (availableProjects.length === 0) {
        return []
      }
      if (availableProjects.length > 5) {
        availableProjects.length = 5
        return availableProjects
      }
      else {
        return availableProjects
      }
    }
    if (projects.length > 5) {
      projects.length = 5
      return projects
    }
    return projects
  }

  async getAllProjects() {
    return await this.projectRepository.find({
      relations: ["lead", "components", "workflow.statuses.transitions", "risk", "permissionScheme"]
    })
  }


  async getProjectByID(ID: number, relations: ProjectRelation[] = [ProjectRelation.Image]) {
    return await this.projectRepository.findOne({ relations, where: { ID } })
  }

  async searchProject(findText: string) {
    return await this.projectRepository.find({
      relations: [ProjectRelation.LEAD],
      where: [
        { project_name: Like(`%${findText}%`) },
        { key: Like(`%${findText}%`) },
        { description: Like(`%${findText}%`) },
      ],
    });
  }



  async getContainsUserPermissionSchemes(key: PermissionSchemeKeys, user: User) {
    let rules: PermissionSchemeRule[] = []
    if (key === PermissionSchemeKeys.BROWSE_PROJECTS) {
      // rules = await this.ruleRepo.find({
      //   where: [
      //     {
      //       PermissionKey: { PermissionKey: key },
      //       Group: { users: { ID: user.ID } }
      //     },
      //     {
      //       PermissionKey: { PermissionKey: key },
      //       User: { ID: user.ID }
      //     },
      //     {
      //       PermissionKey: { PermissionKey: key },
      //       ProjectRole: { members: { members: { ID: user.ID } } }
      //     },
      //     {
      //       PermissionKey: { PermissionKey: key },
      //       is_Project_Lead: true,
      //       PermissionScheme: { project: { Lead: { ID: user.ID } } }
      //     },
      //   ],
      //   relations: ["Group.users", "User", "ProjectRole", "PermissionScheme"],
      //   cache: true
      // })

      rules = await this.ruleRepo.createQueryBuilder("rule")
        .leftJoinAndSelect("rule.permissionKey", "permissionKey")
        .leftJoinAndSelect("rule.group", "group")
        .leftJoinAndSelect("group.users", "users")
        .leftJoinAndSelect("rule.user", "user")
        .leftJoinAndSelect("rule.projectRole", "projectRole")
        .leftJoinAndSelect("projectRole.members", "projectRoleMembers")
        .leftJoinAndSelect("rule.permissionScheme", "permissionScheme")
        .leftJoinAndSelect("permissionScheme.project", "project")
        .leftJoinAndSelect("project.lead", "projectLead")
        .where(
          "(" +
          "(permissionKey.permissionKey = :key AND users.ID = :userID) OR " +
          "(permissionKey.permissionKey = :key AND user.ID = :userID) OR " +
          "(permissionKey.permissionKey = :key AND projectRoleMembers.ID = :userID) OR " +
          "(permissionKey.permissionKey = :key AND rule.is_Project_Lead = true AND projectLead.ID = :userID)" +
          ")",
          { key, userID: user.ID }
        )
        .cache(false)
        .getMany();
    }
    return rules.map((rule) => rule.permissionScheme.ID)
  }

}


function getDateMinusDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
export function uniqueObjects<T>(
  array: T[],
  keyProps?: (keyof T)[]
): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const item of array) {
    // Создаём ключ сравнения
    const key = keyProps
      ? keyProps.map(prop => JSON.stringify(item[prop])).join('|')
      : JSON.stringify(item);

    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}