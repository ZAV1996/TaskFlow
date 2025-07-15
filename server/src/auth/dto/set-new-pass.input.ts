import { Field, InputType } from "@nestjs/graphql"

import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const SetNewPassForgotSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().trim(),
    double_password: z.string().trim(),
    token: z.string().trim()
}).superRefine((data, ctx) => {
    if (data.password !== data.double_password)
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Пароли не совпадают',
            path: ['password'],
        })
})
@InputType()
export class SetNewPassForgot extends createZodDto(SetNewPassForgotSchema) {
    @Field(() => String, { nullable: false })
    email: string

    @Field(() => String, { nullable: false })
    password: string

    @Field(() => String, { nullable: false })
    double_password: string

    @Field(() => String, { nullable: false })
    token: string

}