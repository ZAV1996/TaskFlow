import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/Button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { useMutation } from "@apollo/client"
import { FOGOT_PASSWORD } from "@/services/auth.service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { TypographyH3, TypographyMuted } from "@/components/ui/Typography"
import { Link } from "react-router"

// Схема валидации с помощью Zod
const FormSchema = z.object({
    email: z.string().email({
        message: "Пожалуйста, введите корректный email адрес.",
    }),
})

export function PasswordResetForm() {
    const [mutation, { data, error }] = useMutation(FOGOT_PASSWORD)
    // Инициализация формы
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })

    // Обработчик отправки формы
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        await mutation({
            variables: {
                email: data.email
            }
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div className="flex flex-col gap-2 text-start text-text">
                        <TypographyH3>Забыли пароль?</TypographyH3>
                        <TypographyMuted>Введите свой адрес электронной почты, и мы вышлем вам ссылку для сброса пароля.</TypographyMuted>
                    </div>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="example@mail.com"
                                            {...field}
                                            type="email"
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Введите email, который вы использовали при регистрации.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Отправить инструкции
                    </Button>
                </form>
                <div className="text-center text-sm mt-5">
                    У вас нет учетной записи?{" "}
                    <Link to={'/register'} className="underline underline-offset-4">
                        Зарегистрироваться
                    </Link>
                </div>
            </Form>
            {
                error?.message ?
                    <Alert className="mt-5" variant={"error"}>
                        <AlertTitle>Ошибка</AlertTitle>
                        <AlertDescription>
                            {error?.message}
                        </AlertDescription>
                    </Alert> :
                    <></>
            }
            {data?.forgot ?
                <Alert className="mt-5" variant={"success"}>
                    <AlertTitle>Проверьте вашу почту</AlertTitle>
                    <AlertDescription>{data?.forgot}</AlertDescription>
                </Alert> :
                <></>
            }
        </>
    )
}