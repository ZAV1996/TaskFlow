import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateIssueInput } from "./create.input";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class UpdateIssueInput extends PartialType(CreateIssueInput) {
    @Field(() => Int, { description: "Идентификатор запроса", nullable: false })
    ID: number

    @Field(() => InputID, { description: "Текущее состояние запроса", nullable: true })
    status: InputID

    @Field(() => InputID, { description: "Родительская задача", nullable: true })
    parentIssue: InputID
}