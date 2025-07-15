import { Field, InputType, Int } from "@nestjs/graphql";

import { createZodDto } from 'nestjs-zod'
import { Unique } from "typeorm";
import { z } from 'zod'

export const ProjectRoleInputSchema = z.object({
    ID: z.number(),
    name: z.string().trim().nonempty(),
    description: z.string().trim().optional()
})

@Unique(["name"])
@InputType()
export class ProjectRoleInput extends createZodDto(ProjectRoleInputSchema) {
    @Field(() => Int)
    ID: number

    @Field(() => String)
    name: string

    @Field(() => String, { nullable: true })
    description?: string
}