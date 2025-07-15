import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { InputID } from "src/workflow/inputs/create.input";
import TransitionInput from "./transition.input";

@InputType()
export default class PartialTransitionInput extends PartialType(TransitionInput) {
}