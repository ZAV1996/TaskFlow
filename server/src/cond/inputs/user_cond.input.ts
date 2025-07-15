import { InputType, OmitType, PartialType } from "@nestjs/graphql";
import { UserInput } from "src/users/dto/user.input";

@InputType()
export class InputUser extends PartialType(OmitType(UserInput, ["activationToken", "department", "isActivated", "name", "password", "patronymic", "surname"])) {
}
