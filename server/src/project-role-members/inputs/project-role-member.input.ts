import { Field, InputType, Int } from "@nestjs/graphql"
import { createZodDto } from "nestjs-zod"
import { CreateProjectRoleInput } from "src/project-role/inputs/create-project-role.input"
import { ProjectInput } from "src/projects/inputs/project.input"
import { User } from "src/users/entities/user.entity"
import { InputID, InputIDSchema } from "src/workflow/inputs/create.input"
import z from 'zod'

export const ProjectRoleMemberInputScheme = z.object({
    ID: z.number(),
    role: InputIDSchema,
    project: InputIDSchema,
    members: z.array(InputIDSchema)
})

@InputType()
export class ProjectRoleMemberInput extends createZodDto(ProjectRoleMemberInputScheme) {
    @Field(() => Int)
    ID: number

    @Field(() => InputID)
    role: InputID

    @Field(() => InputID)
    project: InputID

    @Field(() => [InputID])
    members: InputID[]
}