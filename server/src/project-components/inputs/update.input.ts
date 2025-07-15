import { Field, InputType, Int, OmitType, PartialType } from "@nestjs/graphql";
import { CreateProjectComponentInput } from "./create.input";

@InputType()
export class UpdateProjectComponentInput extends PartialType(OmitType(CreateProjectComponentInput, ["parent", "issues"])) {
    @Field(() => Int, { nullable: false })
    ID: number
}
