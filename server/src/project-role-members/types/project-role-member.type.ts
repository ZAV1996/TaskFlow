import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProjectRoleType } from 'src/project-role/types/project-role.type';
import { ProjectType } from 'src/projects/types/project.type';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class ProjectRoleMemberType {
  @Field(() => Int)
  ID: number

  @Field(() => ProjectRoleType)
  role: ProjectRoleType

  @Field(() => ProjectType)
  project: ProjectType

  @Field(() => [User], { nullable: true })
  members: User[]
}
