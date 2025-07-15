import { Field, InputType, Int, OmitType } from "@nestjs/graphql";
import { StatusInput } from "./status.input";
import { CreateOrUpdateCondInput } from "src/cond/inputs/createOrUpdate.input";

@InputType()
export class CreateStatusInput extends OmitType(StatusInput, ["ID", "cond", "parent"]) {
    @Field(() => Int)
    ID: number

    @Field(() => CreateOrUpdateCondInput)
    cond: CreateOrUpdateCondInput

}