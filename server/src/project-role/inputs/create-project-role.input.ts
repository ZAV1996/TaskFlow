import { Field, InputType, Int, OmitType, } from "@nestjs/graphql";
import { createZodDto } from 'nestjs-zod'
import { nullable, z } from 'zod'
import { ProjectRoleInputSchema } from "./project-role.input";


@InputType()
export class CreateProjectRoleInput extends createZodDto(ProjectRoleInputSchema.omit({ ID: true })) {
    @Field(() => String, { nullable: true })
    description: string

    @Field(() => String)
    name: string
}
