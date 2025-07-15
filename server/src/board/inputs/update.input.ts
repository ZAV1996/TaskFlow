import { Field, InputType, Int } from "@nestjs/graphql";

import { BoardInput, BoardInputSchema } from "./board.input";
import { createZodDto } from 'nestjs-zod'
import { board_type } from "../entities/board.entity";
import { InputID } from "src/workflow/inputs/create.input";
@InputType()
export class BoardUpdateInput extends createZodDto(BoardInputSchema.pick({
    board_name: true,
    Owner: true,
    filter: true,
    columns: true,
    ID: true
})) {
    @Field(() => Int, { nullable: false })
    ID: number

    @Field(() => String)
    board_name: string

    @Field(() => InputID)
    Owner: InputID

    @Field(() => InputID, { nullable: true })
    filter: InputID

    @Field(() => [InputID], { nullable: true })
    columns?: InputID[]
}