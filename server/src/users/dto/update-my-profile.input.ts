import { Field, InputType, Int } from "@nestjs/graphql";
import { createZodDto } from "nestjs-zod";
import z from "zod"
const UpdateMyProfileSchema = z.object({
    ID: z.number(),
    department: z.string().trim().optional(),
    email: z.string().trim().email({
        message: "Некорректный адрес электронной почты",
    }).optional(),
    isActivated: z.boolean().optional(),
    name: z.string().trim().optional(),
    surname: z.string().trim().optional(),
    patronymic: z.string().trim().optional(),
    password: z.string().trim().min(8, { message: "минимальная длина пароля 8 символов" }).optional(),
})
const updateMyProfileSchema = UpdateMyProfileSchema.omit({
    password: true,
    isActivated: true,
    email: true,
})
@InputType()
export class UpdateMyProfile extends createZodDto(updateMyProfileSchema) {
    @Field(() => Int)
    ID: number

    @Field(() => String, { nullable: true })
    name: string

    @Field(() => String, { nullable: true })
    surname: string

    @Field(() => String, { nullable: true })
    patronymic: string

    @Field(() => String, { nullable: true })
    department: string
}