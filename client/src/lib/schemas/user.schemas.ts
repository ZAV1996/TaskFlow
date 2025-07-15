import { z } from "zod";
export const UserSchema = z.object({
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
export type UserSchemaType = z.infer<typeof UserSchema>;