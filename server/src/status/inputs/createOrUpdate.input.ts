import { Field, InputType, PartialType } from "@nestjs/graphql";
import { StatusInput } from "./status.input";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class CreateOrUpdateStatusInput extends PartialType(StatusInput) {

    @Field(() => InputID, { description: "Идентификатор родительского бизнес-процесса", nullable: false })
    parent: InputID
    
}