import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRoleMemberInput } from './inputs/project-role-member.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRoleMember } from './entities/project-role-member.entity';
import { Repository } from 'typeorm';
import { AddMemberInRoleInput } from './inputs/add-member.input';
import { GetProjectRoleMemberInput } from './inputs/get-member.input';
import { ForbiddenError } from '@nestjs/apollo';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class ProjectRoleMembersService {
  constructor(
    @InjectRepository(ProjectRoleMember) private projectRoleMemberRepo: Repository<ProjectRoleMember>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) { }

  async getProjectRoleMembers(input: GetProjectRoleMemberInput) {
    const members = (await this.projectRoleMemberRepo.findOne({ where: input, relations: ["members"] }))?.members;
    return members ?? []
  }

  async addMemberInProjectRole(input: AddMemberInRoleInput) {
    let candidate: User | null = null
    let result: ProjectRoleMember | null = null
    const members = await this.projectRoleMemberRepo.findOne({
      where: {
        project: input.project,
        role: input.role
      },
      relations: ["members", "role"],
      cache: true
    })

    if (!members) return new NotFoundException()
    for (const member of input.members) {
      const user = members.members.find(user => user.ID === member.ID)
      if (!user)
        candidate = await this.userRepo.findOneBy({ ID: member.ID })
      if (candidate)
        members.members.push(candidate)
      result = await this.projectRoleMemberRepo.save(members)
    }
    return result
  }
}
