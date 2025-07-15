import { Field, InputType, PickType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { UserInput, UserInputSchema } from 'src/users/dto/user.input';
import z from "zod"
@InputType()
export class LoginInput extends createZodDto(UserInputSchema.pick({
    email: true,
    password: true
})) {
    @Field()
    email: string;

    @Field()
    password: string;
}