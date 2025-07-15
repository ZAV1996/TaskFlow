import { Field, InputType, Int } from "@nestjs/graphql";
import { WorkflowInput } from "../../workflow/inputs/workflow.input";
import { CondInput } from "../../cond/inputs/cond.input";
import { InputID, InputIDSchema } from "src/workflow/inputs/create.input";
import z from "zod"
import { createZodDto } from "nestjs-zod";
import { StatusMetaInput } from "./status.meta.input";

export const StatusInputSchema = z.object({
    ID: z.number(),
    parent: InputIDSchema,
    title: z.string().trim(),
    is_initial: z.boolean()
})

@InputType()
export class StatusInput extends createZodDto(StatusInputSchema) {

    @Field(() => Int, { description: "Идентификатор статуса" })
    ID: number

    @Field(() => InputID, { description: "Идентификатор родительского бизнес-процесса", nullable: true })
    parent: InputID

    @Field(() => String, { description: "Название статуса" })
    title: string

    @Field(() => CondInput, { description: "Доступ для перехода на этот статус" })
    cond: CondInput

    @Field(() => Boolean, { description: "Начальный статус", nullable: false, defaultValue: false })
    is_initial: boolean

    @Field(() => Boolean, { description: "Конечный статус", nullable: false, defaultValue: false })
    is_finished: boolean

    @Field(() => Boolean, { description: "Cтатус в процессе", nullable: false, defaultValue: false })
    on_process: boolean

    @Field(() => StatusMetaInput)
    status_meta: StatusMetaInput
}