import { Field, InputType, PickType } from "@nestjs/graphql";
import { createZodDto } from "nestjs-zod";
import { UserInput, UserInputSchema } from "src/users/dto/user.input";

@InputType()
export class ForgotPassInput extends createZodDto(UserInputSchema.pick({
    email: true
})) {
    @Field(() => String, { description: "Адрес электронной почты пользователя" })
    email: string
}