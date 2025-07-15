import { Field, InputType, Int } from "@nestjs/graphql";
import { InputID, InputIDSchema } from "src/workflow/inputs/create.input";

import { createZodDto } from 'nestjs-zod'
import { z, ZodEnum } from 'zod'

export const ColumnInputSchema = z.object({
    ID: z.number(),
    column_name: z.string().trim().nonempty(),
    statuses: z.array(InputIDSchema).optional(),
    board: InputIDSchema,
    column_position: z.number()
})

@InputType()
export class ColumnInput extends createZodDto(ColumnInputSchema) {
    @Field(() => Int, { nullable: false })
    ID: number

    @Field(() => String, { nullable: true })
    column_name: string

    @Field(() => [InputID], { nullable: true })
    statuses?: InputID[]

    @Field(() => InputID, { nullable: true })
    board: InputID

    @Field(() => Int, { nullable: false })
    column_position: number
}