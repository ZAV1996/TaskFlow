"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { useMutation } from "@apollo/client"
import { SET_NEW_PASS_FROM_FORGOT } from "@/services/auth.service"
import { useParams, useSearchParams } from "react-router"

// Схема валидации
const passwordSchema = z.object({
    password: z.string()
        .min(8, { message: "Пароль должен содержать минимум 8 символов" })
        .regex(/[A-Z]/, { message: "Пароль должен содержать хотя бы одну заглавную букву" })
        .regex(/[0-9]/, { message: "Пароль должен содержать хотя бы одну цифру" }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"]
})

export default function SetNewPasswordForm() {
    const [searchParams] = useSearchParams();

    const email = searchParams.get('email');
    const token = searchParams.get('token');

    const [resetPassword, { data, error }] = useMutation(SET_NEW_PASS_FROM_FORGOT)
    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    async function onSubmit(values: z.infer<typeof passwordSchema>) {
        if (email && token)
            await resetPassword({
                variables: {
                    email,
                    token,
                    password: values.password,
                    double_password: values.confirmPassword
                }
            })
    }

    return (
        <div className="space-y-6">
            <Alert variant="success" className="mb-6">
                <AlertDescription>
                    Введите новый пароль для вашего аккаунта
                </AlertDescription>
            </Alert>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="password"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Новый пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Введите новый пароль"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Подтвердите пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Повторите новый пароль"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="text-sm text-muted-foreground">
                        <p>Пароль должен содержать:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>Минимум 8 символов</li>
                            <li>Хотя бы одну заглавную букву</li>
                            <li>Хотя бы одну цифру</li>
                        </ul>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Сохранение...
                            </>
                        ) : "Установить новый пароль"}
                    </Button>
                </form>
            </Form>
            {data?.updatePass ?
                <Alert variant={"success"}>
                    <AlertTitle>Успешно</AlertTitle>
                    <AlertDescription>{data?.updatePass}</AlertDescription>
                </Alert> :
                <></>
            }
            {error?.message ?
                <Alert variant={"error"}>
                    <AlertTitle>Ошибка</AlertTitle>
                    <AlertDescription>{error?.message}</AlertDescription>
                </Alert> :
                <></>
            }
        </div>
    )
}