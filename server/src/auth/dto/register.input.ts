import { InputType, Field, PickType } from '@nestjs/graphql';
import { UserInput, UserInputSchema } from '../../users/dto/user.input';
import { createZodDto } from 'nestjs-zod';

@InputType()
export class RegisterInput extends createZodDto(UserInputSchema.pick({
    name: true,
    surname: true,
    patronymic: true,
    password: true,
    email: true
})) {
    @Field(() => String, { description: "Адрес электронной почты пользователя", nullable: false })
    email: string

    @Field(() => String, { description: "Имя пользователя", nullable: false })
    name: string

    @Field(() => String, { description: "Фамилия пользователя", nullable: false })
    surname: string

    @Field(() => String, { description: "Отчество пользователя", nullable: false })
    patronymic: string

    @Field(() => String, { description: "Пароль", nullable: false })
    password: string
}