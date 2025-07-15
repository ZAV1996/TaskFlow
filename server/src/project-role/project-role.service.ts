import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRole } from './entities/project-role.entity';
import { Repository } from 'typeorm';
import { CreateProjectRoleInput } from './inputs/create-project-role.input';
import { InputID } from 'src/workflow/inputs/create.input';
import { ProjectRoleInput } from './inputs/project-role.input';
import { ForbiddenError } from '@nestjs/apollo';


@Injectable()
export class ProjectRoleService {
  constructor(
    @InjectRepository(ProjectRole) private projectRoleRepo: Repository<ProjectRole>
  ) { }

  async getProjectRoles() {
    return await this.projectRoleRepo.find();
  }

  async createProjectRole(input: CreateProjectRoleInput) {
    const role = await this.projectRoleRepo.findOneBy(input)
    if (role) throw new ForbiddenError("Роль с таким именем уже существует")
    return await this.projectRoleRepo.save(input)
  }

  async updateProjectRole(input: ProjectRoleInput) {
    const role = await this.projectRoleRepo.findOneBy({ ID: input.ID })
    if (!role) throw new NotFoundException("Role is not found")
    return await this.projectRoleRepo.save({ ...role, ...input })
  }

  async deleteProjectRole(input: InputID) {
    const role = await this.projectRoleRepo.findOneBy({ ID: input.ID })
    if (!role) throw new NotFoundException("Role is not found")
    return await this.projectRoleRepo.delete({ ID: input.ID })
  }

}
