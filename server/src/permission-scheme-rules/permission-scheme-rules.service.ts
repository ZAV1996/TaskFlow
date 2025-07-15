import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionSchemeKeys, PermissionSchemeRule } from './entities/permission-scheme-rule.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PermissionScheme } from 'src/permission-scheme/entities/permission-scheme.entity';
import { ProjectType } from 'src/projects/types/project.type';
import { IssueType } from 'src/issues/types/issue.type';
import { Project } from 'src/projects/entities/project.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { GroupRelations, GroupsService } from 'src/groups/groups.service';
import { InputID } from 'src/workflow/inputs/create.input';
import { GetPermissionRulesBySchemeID } from './inputs/get-permission-scheme-rule.input';
import { ProjectsService } from 'src/projects/projects.service';
import { Group } from 'src/groups/entities/group.entity';
import { UpdatePermissionSchemeRuleInput } from './inputs/update-permission-scheme.input';
export enum PermissionRuleRelations {
  USER = "user",
  GROUP = "group",
  PROJECT_ROLE = "projectRole",
  PERMISSION_KEY = "permissionKey",
  PERMISSION_SCHEME = "permissionScheme"
}
@Injectable()
export class PermissionSchemeRulesService {
  constructor(
    @InjectRepository(PermissionSchemeRule) private readonly ruleRepo: Repository<PermissionSchemeRule>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
  ) { }

  async updatePermissionRule(input: UpdatePermissionSchemeRuleInput) {
    const rule = (await this.ruleRepo.findOne({ where: { ID: input.ID } }))
    if (!rule) throw new NotFoundException({ message: "Правило не найдено" })
    return await this.ruleRepo.save({ ...rule, ...input })
  }

  async getPermissionRulesByProjectID(input: InputID, relations: PermissionRuleRelations[] = [PermissionRuleRelations.GROUP, PermissionRuleRelations.PROJECT_ROLE, PermissionRuleRelations.USER, PermissionRuleRelations.PERMISSION_KEY, PermissionRuleRelations.PERMISSION_SCHEME]) {
    return await this.ruleRepo.find({
      where:
      {
        permissionScheme: {
          project: input
        },
        // ProjectRole: {
        //   members: {
        //     project: input
        //   }
        // }
      },
      relations
    })
  }


  async getPermissionRulesBySchemeID(input: InputID, relations: PermissionRuleRelations[] = [PermissionRuleRelations.GROUP, PermissionRuleRelations.PROJECT_ROLE, PermissionRuleRelations.USER, PermissionRuleRelations.PERMISSION_KEY]) {
    return await this.ruleRepo.find({
      where: {
        permissionScheme: input
      }, relations
    })
  }


  async getPermissionRulesByKey(permissionKey: PermissionSchemeKeys, project: Project, relations: PermissionRuleRelations[] = []) {
    return await this.ruleRepo.findOne({ where: { permissionKey: { permissionKey }, permissionScheme: { ID: project.permissionScheme.ID } }, relations })
  }



}
