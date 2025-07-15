import { Field, InputType, Int } from "@nestjs/graphql";
import { InputID } from "src/workflow/inputs/create.input";
import { TransitionMetaInput } from "./transition.meta.inpit";

@InputType()
export default class TransitionInput {
    @Field(() => Int, { nullable: true })
    ID: number

    @Field(() => String, { nullable: true })
    title: string

    @Field(() => InputID, { nullable: true })
    to: InputID

    @Field(() => InputID, { nullable: true })
    parent: InputID

    @Field(() => TransitionMetaInput)
    transition_meta: TransitionMetaInput
}