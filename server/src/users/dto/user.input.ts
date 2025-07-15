import { Field, Int, InputType } from '@nestjs/graphql';

import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const UserInputSchema = z.object({
    ID: z.number(),
    email: z.string().email().trim().nonempty(),
    name: z.string().trim().nonempty(),
    surname: z.string().trim().nonempty(),
    patronymic: z.string().trim().nonempty(),
    password: z.string().trim().nonempty().min(6, "Минимальная длина пароля 6 символов"),
    department: z.string().trim().optional(),
    isActivated: z.boolean().optional(),
    activationToken: z.string().trim().optional()
})

@InputType()
export class UserInput extends createZodDto(UserInputSchema) {
    @Field(() => Int, { description: "Идентификатор пользователя" })
    ID: number

    @Field(() => String, { description: "Адрес электронной почты пользователя" })
    email: string

    @Field(() => String, { description: "Имя пользователя" })
    name: string

    @Field(() => String, { description: "Фамилия пользователя" })
    surname: string

    @Field(() => String, { description: "Отчество пользователя" })
    patronymic: string

    @Field(() => String, { description: "Пароль" })
    password: string

    @Field(() => String, { description: "Подразделение" })
    department: string

    @Field(() => Boolean, { description: "Пользовательский статус" })
    isActivated: boolean

    @Field(() => String, { description: "Токен активации пользователя", nullable: true })
    activationToken: string
}

