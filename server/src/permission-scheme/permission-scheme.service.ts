import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionScheme } from './entities/permission-scheme.entity';
import { Repository } from 'typeorm';
import { CreatePermissionSchemeInput } from './inputs/create-permission-scheme.input';
import { PermissionSchemeKeys, PermissionSchemeDescriptions, PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';
import { PermissionSchemeRulesService } from 'src/permission-scheme-rules/permission-scheme-rules.service';
import { InputID } from 'src/workflow/inputs/create.input';
import { ProjectsService } from 'src/projects/projects.service';
import { Project } from 'src/projects/entities/project.entity';
import { ForbiddenError } from '@nestjs/apollo';
import { PermissionKey } from 'src/init/entities/PermissionKeys.entity';
import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';
import { RolesEnum } from 'src/common/decotators/Roles.decorator';


@Injectable()
export class PermissionSchemeService {

  constructor(
    @InjectRepository(PermissionScheme) private readonly permissionRepo: Repository<PermissionScheme>,
    @InjectRepository(PermissionSchemeRule) private readonly permissionRuleRepo: Repository<PermissionSchemeRule>,
    @InjectRepository(Project) private readonly projectRepo: Repository<Project>,
    @InjectRepository(PermissionKey) private readonly permissionKeyRepo: Repository<PermissionKey>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
  ) { }

  async createPermissionScheme(input: CreatePermissionSchemeInput) {
    const keys = (await this.permissionKeyRepo.find()).map(item => ({ permissionKey: item }))
    const rules = await this.permissionRuleRepo.save(keys)
    return await this.permissionRepo.save({
      name: input.name,
      description: input.description,
      permissionSchemeRule: rules
    })
  }

  async updatePermissionScheme() {
    //TODO
  }

  async deletePermissionScheme(input: InputID) {
    const project = await this.projectRepo.findOne({ where: { permissionScheme: input } })
    if (project) throw new ForbiddenError("Данная схема используется в других проектах")
    return await this.permissionRepo.delete(input) ? true : false
  }

  async checkAdministrator(user: User) {
    const group = await this.groupRepo.findOne({ where: { group_name: "Administrators" }, relations: ["users"], cache: true })
    if (group?.users.some(member => member.ID === user.ID)) return true
  }

  async checkPermission(permission: PermissionSchemeRule, target: Project, user: User, Role: RolesEnum | null = null) {
    if (!permission) return false;

    if (Role) {
      const check = await this.checkAdministrator(user)
      if (check) return true
    }

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

}
