import { InputType, IntersectionType, PickType } from "@nestjs/graphql";
import { UpdateUserInput } from "./update-user.input";
import { UserInput } from "./user.input";

@InputType()
export class UpdateUserInputWithToken extends IntersectionType(UpdateUserInput, PickType(UserInput, ["activationToken"])) { }