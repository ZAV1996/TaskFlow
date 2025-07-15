import { InputType, Int, Field, PickType, PartialType } from '@nestjs/graphql';
import { GroupInput, GroupInputSchema } from './group.input';
import { createZodDto } from 'nestjs-zod';


@InputType()
export class CreateGroupInput extends createZodDto(GroupInputSchema.pick({
    group_name: true,
    description: true,
})) {
    @Field(() => String, { description: "Название группы", nullable: false })
    group_name: string

    @Field(() => String, { description: "Описание группы", nullable: true })
    description: string
}

