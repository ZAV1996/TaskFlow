import { Field, InputType, Int } from '@nestjs/graphql'
import { createZodDto } from 'nestjs-zod'
import z from 'zod'
const ChangePasswordInputSchema = z.object({
    ID: z.number(),
    currentPassword: z.string().trim().nonempty(),
    newPassword: z.string().trim().min(8, { message: "Минимальная длина пароля 8 символов" }),
    repeatNewPassword: z.string().trim().min(8, { message: "Минимальная длина пароля 8 символов" })
}).refine((data) => data.newPassword === data.repeatNewPassword, { message: "Пароли не совпадают", path: ["password_confirm"] })

@InputType()
export class ChangePasswordInput extends createZodDto(ChangePasswordInputSchema) {
    @Field(() => Int, { nullable: false })
    ID: number

    @Field(() => String, { nullable: false })
    currentPassword: string

    @Field(() => String, { nullable: false })
    newPassword: string

    @Field(() => String, { nullable: false })
    repeatNewPassword: string
}