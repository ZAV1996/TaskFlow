import { Field, ID, InputType, Int, OmitType } from "@nestjs/graphql";
import { createZodDto } from "nestjs-zod";
import { ColumnInput, ColumnInputSchema } from "./columns.input";
import { BoardInput } from "src/board/inputs/board.input";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class CreateColumnInput {
    @Field(() => String, { nullable: true })
    column_name: string

    @Field(() => InputID, { nullable: false })
    board: InputID

    @Field(() => Int, { nullable: true })
    column_position: number

}