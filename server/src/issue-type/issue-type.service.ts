import { Injectable } from '@nestjs/common';
import { CreateIssueTypeInput } from './dto/create-issue-type.input';
import { UpdateIssueTypeInput } from './dto/update-issue-type.input';
import { IssueTypeEntity } from './entities/issue-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class IssueTypeService {
  constructor(
    @InjectRepository(IssueTypeEntity) readonly typeRepo: Repository<IssueTypeEntity>
  ) { }
  async getIssueTypeByID(ID: number) {
    return await this.typeRepo.findOne({ where: { ID }, relations: ["workflow", "workflow.statuses"] })
  }

  async createIssueType(input: CreateIssueTypeInput): Promise<IssueTypeEntity> {
    return await this.typeRepo.save({
      name: input.name,
      project: input.project,
      descriprion: input.description,
      icon_url: input.icon_url,
      workflow: input.workflow
    })
  }
}
