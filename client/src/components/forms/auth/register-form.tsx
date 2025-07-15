import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, Form, FormMessage } from "@/components/ui/Form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLazyQuery, useMutation } from "@apollo/client"
import { REGISTER, SIGN_IN } from "@/services/auth.service"
import { useContext } from "react"
import { AuthContext } from "@/providers/AuthProvider"
import { Alert, AlertDescription } from "../../ui/Alert"
import { GET_CURRENT_USER } from "@/services/user.service"
import type { MutationRegisterArgs, RegisterInput } from "@/types/graphql"
import { TypographyH3 } from "@/components/ui/Typography"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    name: z.string().trim(),
    patronymic: z.string().trim(),
    surname: z.string().trim(),
    email:
        z.string()
            .trim()
            .email({
                message: "Некорректный адрес электронной почты",
            }).
            endsWith("@uuap.com", 'Адрес электронной почты должен оканчиваться на "@uuap.com"'),
    password: z.string({
        required_error: "Поле обязательно"
    }).trim().
        min(6, {
            message: "Минимальная длина пороля 8 символов"
        }),
    password_confirm: z.string({}).trim()
}).refine(data => data.password === data.password_confirm, {
    message: "Пароли должны совпадать",
    path: ["password_confirm"],
});


export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [signUp, data] = useMutation(REGISTER)
    const form = useForm<z.infer<typeof formSchema> & { password_confirm: string }>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            patronymic: "",
            surname: "",
            password_confirm: ""
        }
    }
    )
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signUp({
            variables: values,
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6 text-text", className)} {...props}>

                <TypographyH3>Зарегистрироваться</TypographyH3>

                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Адрес электронной почты</FormLabel>
                                <FormControl>
                                    <Input type={"email"} placeholder="Введите ваш логин" autoComplete="email"   {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        rules={{ required: true }}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex">
                                    <FormLabel>Фамилия</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Введите вашу фамилию" type={'text'} autoComplete="surname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        rules={{ required: true }}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex">
                                    <FormLabel >Имя</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Введите ваше имя" type={'text'} autoComplete="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        rules={{ required: true }}
                        name="patronymic"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex">
                                    <FormLabel>Отчество</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Введите ваше отчество" type={'text'} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        rules={{ required: true }}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex">
                                    <FormLabel>Пароль</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Введите пароль" type={'password'} autoComplete="new-password"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        rules={{ required: true }}
                        name="password_confirm"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex">
                                    <FormLabel>Подтвердите ваш пароль</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Введите пароль" type={'password'} autoComplete="new-password"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting} >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Регистрация...
                            </>
                        ) : "Зарегистрироваться"}
                    </Button>
                </div>
                <div className="text-center text-sm">
                    У вас есть учетная запись?{" "}
                    <Link to={'/login'} className="underline underline-offset-4">
                        Войти
                    </Link>
                </div>
                {
                    data.error?.message ?
                        <Alert variant={"error"}>
                            <AlertDescription>
                                {data.error?.message}
                            </AlertDescription>
                        </Alert> :
                        <></>
                }
                {
                    data.data?.register ?
                        <Alert variant={"success"}>
                            <AlertDescription>
                                {data.data?.register}
                            </AlertDescription>
                        </Alert> :
                        <></>
                }
            </form>
        </Form>
    )
}
