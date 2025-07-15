import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { createZodDto } from "nestjs-zod";
import { ColumnInputSchema } from "./columns.input";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class UpdateColumnInput extends createZodDto(ColumnInputSchema.pick(
    {
        ID: true,
        column_name: true,
        statuses: true,
        column_position: true
    }
).partial({
    column_name: true,
    statuses: true,
    column_position: true
})) {
    @Field(() => Int)
    ID: number

    @Field(() => String, { nullable: true })
    column_name?: string

    @Field(() => [InputID], { nullable: true })
    statuses?: InputID[]

    @Field(() => Int, { nullable: true })
    column_position?: number
}