import { Field, InputType, Int } from "@nestjs/graphql";
import { StatusInput, StatusInputSchema } from "../../status/inputs/status.input";

import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const WorkflowInputSchema = z.object({
    ID: z.number(),
    title: z.string().trim().nonempty(),
    statuses: z.array(StatusInputSchema),
    description: z.string().trim().optional(),
})

@InputType()
export class WorkflowInput extends createZodDto(WorkflowInputSchema) {
    @Field(() => Int, { description: "ID бизнес-процесса" })
    ID: number;
    @Field(() => String, { description: "Название бизнес-процесса" })
    title: string

    @Field(() => String, { description: "Описание бизнес-процесса" })
    description: string

    @Field(() => Date, { description: "Дата создания бизнес процесса" })
    create_date: Date

    @Field(() => Date, { description: "Дата обновления бизнес процесса" })
    update_date: Date
}
