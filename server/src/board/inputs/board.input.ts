import { Field, InputType, Int, registerEnumType } from "@nestjs/graphql";

import { board_type } from "../types/board.type";
import { InputID, InputIDSchema } from "src/workflow/inputs/create.input";

import { createZodDto } from 'nestjs-zod'
import { z, ZodEnum } from 'zod'

const boardTypeEnumValues = Object.values(board_type) as Array<board_type>;
export const BoardInputSchema = z.object({
    ID: z.number(),
    board_name: z.string().trim().nonempty(),
    board_type: z.enum(boardTypeEnumValues as [board_type, ...board_type[]]),//boardTypeEnumValues as [board_type, ...board_type[]]
    Owner: InputIDSchema,
    filter: InputIDSchema.optional(),
    columns: z.array(InputIDSchema).optional()
})
registerEnumType(board_type, { name: "board_type" })

@InputType()
export class BoardInput extends createZodDto(BoardInputSchema.omit({ ID: true })) {
    @Field(() => Int, { nullable: true })
    ID: number

    @Field(() => String)
    board_name: string

    @Field(() => board_type)
    board_type: board_type

    @Field(() => InputID)
    Owner: InputID

    @Field(() => InputID, { nullable: true })
    filter: InputID

    @Field(() => [InputID], { nullable: true })
    columns?: InputID[]
}
