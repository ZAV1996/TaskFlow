import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectComponent } from './entities/project-component.entity';
import { Repository } from 'typeorm';
import { CreateProjectComponentInput } from './inputs/create.input';
import { ProjectsService } from 'src/projects/projects.service';
import { ForbiddenError } from '@nestjs/apollo';
import { InputID } from 'src/workflow/inputs/create.input';
import { UpdateProjectComponentInput } from './inputs/update.input';

@Injectable()
export class ProjectComponentsService {
  constructor(
    @InjectRepository(ProjectComponent) private componentRepo: Repository<ProjectComponent>,
    private projectsService: ProjectsService
  ) { }

  async createComponent(input: CreateProjectComponentInput) {
    const project = await this.projectsService.getProjectByID(input.parent.ID);
    if (!project)
      throw new ForbiddenError("Проект не найден")
    if (project.components.length > 0) {
      if (project.components.some(component => component.title === input.title))
        throw new ForbiddenError("Компонент с таким названием уже существует.")
    }
    return await this.componentRepo.save(input)
  }

  async updateComponent(input: UpdateProjectComponentInput) {
    return await this.componentRepo.save(input)
  }

  async deleteComponent(input: InputID) {
    return (await this.componentRepo.delete(input)).raw
  }
}
