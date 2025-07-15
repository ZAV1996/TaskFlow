import { InputType, Int, Field } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import z from "zod"

export const GroupInputSchema = z.object({
    ID: z.number(),
    group_name: z.string().trim(),
    description: z.string().trim(),
})


@InputType()
export class GroupInput extends createZodDto(GroupInputSchema) {
    @Field(() => Int, { description: "Идентификатор группы" })
    ID: number;

    @Field(() => String, { description: "Название группы", nullable: false })
    group_name: string

    @Field(() => String, { description: "Описание группы", nullable: true })
    description: string
}