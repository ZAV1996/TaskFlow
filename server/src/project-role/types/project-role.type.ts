import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProjectRoleMemberType } from "src/project-role-members/types/project-role-member.type";

@ObjectType()
export class ProjectRoleType {
    @Field(() => Int)
    ID: number

    @Field(() => String)
    name: string

    @Field(() => String, { nullable: true })
    description: string

    @Field(() => [ProjectRoleMemberType], {nullable: true})
    members: ProjectRoleMemberType[]
}
