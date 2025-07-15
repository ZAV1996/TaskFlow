import { Field, InputType, Int } from "@nestjs/graphql";

import { createZodDto } from 'nestjs-zod';
import z from "zod"

export const GroupMemberInputSchema = z.object({
    userID: z.number(),
    groupID: z.number(),
})
@InputType()
export class GroupMemberInput extends createZodDto(GroupMemberInputSchema) {
    @Field(() => Int, { nullable: false })
    userID: number;

    @Field(() => Int, { nullable: false })
    groupID: number;
}