import { InputType, Field, OmitType } from '@nestjs/graphql';
import { UserInput, UserInputSchema } from './user.input';

import { createZodDto } from 'nestjs-zod'
@InputType()
export class CreateUserInput extends createZodDto(UserInputSchema.omit({
    isActivated: true,
    department: true,
    ID: true
})) {
    @Field(() => String, { nullable: false })
    email: string

    @Field(() => String)
    name: string

    @Field(() => String)
    password: string

    @Field(() => String)
    patronymic: string

    @Field(() => String)
    surname: string
}

