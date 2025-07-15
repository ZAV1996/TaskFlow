import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { createZodDto } from "nestjs-zod";
import { InputUser } from "src/cond/inputs/user_cond.input";

import { InputID, InputIDSchema } from "src/workflow/inputs/create.input";
import z from 'zod'

export const issueInputScheme = z.object({
    ID: z.number(),
    project: InputIDSchema,
    issueType: InputIDSchema,
    title: z.string(),
    author: InputIDSchema,
    assignee: InputIDSchema.optional(),
    parentIssue: InputIDSchema.optional(),
    childrenIssues: z.array(InputIDSchema),
    due_date: z.date().optional(),
    components: z.array(InputIDSchema).optional(),
    description: z.string().optional(),
    priority: z.string().optional(),
    status: InputIDSchema,
    create_date: z.date(),
    update_date: z.date(),
})

@InputType()
export class IssueInput extends createZodDto(issueInputScheme) {

    @Field(() => Int, { description: "Идентификатор запроса" })
    ID: number

    @Field(() => InputID, { description: "Проект, к которому принадлежит запрос" })
    project: InputID

    @Field(() => InputID, { description: "Тип запроса" })
    issueType: InputID

    @Field(() => InputID, { description: "Пользователь, который внес запрос в систему" })
    author: InputID

    @Field(() => InputID, { description: "Исполнитель для работы над запросом" })
    assignee: InputID

    @Field(() => String, { description: "Сводка" })
    title: string

    @Field(() => String, { description: "Описание запроса" })
    description: string

    @Field(() => [InputID], { description: "Компоненты в рамках проекта, которые связанны с данным запросом" })
    components: InputID[]

    @Field(() => String, { description: "Приоритет запроса" })
    priority: "Высокий" | "Средний" | "Низкий"

    @Field(() => InputID, { description: "Текущее состояние запроса" })
    status: InputID

    @Field(() => InputID, { description: "Родительская запрос" })
    parentIssue: InputID

    @Field(() => [InputID], { description: "Дочерние запросы" })
    childrenIssues: InputID[]

    @Field(() => Date, { description: "Дата и время создания запроса" })
    create_date: Date

    @Field(() => Date, { description: "Дата и время последнего обновления запроса" })
    update_date: Date

    @Field(() => Date, { description: "Срок исполнения запроса" })
    due_date: Date
}
