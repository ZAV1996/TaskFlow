import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UserInput, UserInputSchema } from "src/users/dto/user.input";
import { createZodDto } from 'nestjs-zod'
@InputType()
export class ConfirmInput extends createZodDto(UserInputSchema.pick({
    email: true,
    activationToken: true
})) {
    @Field(() => String)
    email: string

    @Field(() => String)
    activationToken: string
}