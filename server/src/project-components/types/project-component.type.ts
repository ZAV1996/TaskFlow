import { Field, Int, ObjectType } from "@nestjs/graphql"
import { ProjectType } from "src/projects/types/project.type"
import { User } from "src/users/entities/user.entity"

@ObjectType()
export class ProjectComponentType {
    @Field(() => Int, { nullable: false })
    ID: number

    @Field(() => ProjectType, { nullable: false } )
    parent: ProjectType

    @Field(()=>String, { nullable: false })
    title: string

    @Field(()=>String, { nullable: true })
    description: string

    @Field(() => User, { nullable: true })
    owner: User

    @Field(() => User, { nullable: true })
    defaultExecuter: User
}