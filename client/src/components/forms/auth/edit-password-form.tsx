import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { Button } from "@/components/ui/Button"
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { CHANGE_PASSWORD, GET_CURRENT_USER_SESSIONS } from "@/services/auth.service"
import { useMutation } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import { z } from "zod"

//TODO - добавить всякие подтверждалки и уведомляшки о том "Вы действительно хотиете это сделать, но пока на скорую руку"
export default function EditPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const mutation = useMutation(CHANGE_PASSWORD, {
        refetchQueries: [
            { query: GET_CURRENT_USER_SESSIONS }
        ]
    });
    const formSchema = z.object({
        currentPassword: z.string({
            required_error: "Поле обязательно"
        }).trim(),
        newPassword: z.string({
            required_error: "Поле обязательно"
        }).trim().min(8, { message: "Минимальная длина пороля 8 символов" }),
        repeatNewPassword: z.string({
            required_error: "Поле обязательно"
        }).trim().min(8, { message: "Минимальная длина пороля 8 символов" })
    }).refine((data) => data.newPassword === data.repeatNewPassword, {
        message: "Пароли должны совпадать",
        path: ["repeatNewPassword"],
    })
    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                currentPassword: "",
                newPassword: "",
                repeatNewPassword: ""
            }
        }
    )
    const { id } = useParams()
    async function onSubmit({ currentPassword, newPassword, repeatNewPassword }: z.infer<typeof formSchema>) {
        mutation[0]({
            variables: {
                currentPassword,
                newPassword,
                repeatNewPassword,
                ID: Number(id)
            }
        })
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6 text-text", className)} {...props}>
                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Текущий пароль</FormLabel>
                                <FormControl>
                                    <Input type={"password"} placeholder="Введите текущий пароль" autoComplete="current-password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            rules={{ required: true }}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Новый пароль</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Введите пароль" type={'password'}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            rules={{ required: true }}
                            name="repeatNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Подтверждение пароля</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Введите пароль" type={'password'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full" >
                        Сменить
                    </Button>
                </div>
                {mutation[1].data?.changePassword.ID ? <Alert variant={"success"}>
                    <AlertTitle>Успешно</AlertTitle>
                    <AlertDescription>Пароль сменен</AlertDescription>
                </Alert> : <></>}
                {mutation[1].error?.message ? (
                    <Alert variant={"error"}>
                        <AlertTitle>Ошибка</AlertTitle>
                        <AlertDescription>{mutation[1].error?.message}</AlertDescription>
                    </Alert>
                ) : <></>}
            </form>
        </Form>
    )
}
