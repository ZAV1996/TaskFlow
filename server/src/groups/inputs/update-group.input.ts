import { CreateGroupInput } from './create-group.input';
import { InputType, Field, Int, PartialType, PickType } from '@nestjs/graphql';
import { GroupInput } from './group.input';

import { createZodDto } from 'nestjs-zod';
import z from "zod"

export const GroupInputSchema = z.object({
  ID: z.number(),
  group_name: z.string().trim().nonempty(),
  description: z.string().trim().optional(),
})

@InputType()
export class UpdateGroupInput extends createZodDto(GroupInputSchema) {
  @Field(() => Int, { description: "Идентификатор группы" })
  ID: number;

  @Field(() => String, { nullable: true, description: "Имя группы" })
  group_name: string

  @Field(() => String, { nullable: true, description: "Описание группы" })
  description: string
}