import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from "@/components/ui/Form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@apollo/client"
import { SIGN_IN } from "@/services/auth.service"
import { useContext } from "react"
import { AuthContext } from "@/providers/AuthProvider"
import { Alert, AlertDescription } from "../../ui/Alert"
import { GET_CURRENT_USER } from "@/services/user.service"
import { TypographyH3 } from "@/components/ui/Typography"
import { Loader2 } from "lucide-react"


export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const authContext = useContext(AuthContext);
    const [signIn, data] = useMutation(SIGN_IN, {
        update(cache, { data }) {
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { getCurrentUser: data?.login }
            })
        }
    })
    const formSchema = z.object({
        email:
            z.string()
                .trim()
                .email({
                    message: "Некорректный адрес электронной почты",
                }),
        password: z.string({
            required_error: "Поле обязательно"
        }).
            trim().
            min(6, {
                message: "Минимальная длина пороля 8 символов"
            }),
    })
    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
                password: ""
            }
        }
    )
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const responce = await signIn({
            variables: values,
        })
        if (responce.data?.login) {
            authContext?.setIsAuth(responce.data.login ? true : false)
        }
    }


    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6 text-text", className)} {...props}>

                <TypographyH3>Войдите в свой аккаунт</TypographyH3>

                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Адрес электронной почты</FormLabel>
                                <FormControl>
                                    <Input type={"email"} placeholder="Введите ваш логин" autoComplete="username"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            rules={{ required: true }}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex">
                                        <FormLabel>Пароль</FormLabel>
                                        <Link
                                            to={'/forgot'}
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Забыли пароль?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input placeholder="Введите пароль" type={'password'} autoComplete="current-password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting} >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Вход...
                            </>
                        ) : "Войти"}
                    </Button>
                </div>
                <div className="text-center text-sm">
                    У вас нет учетной записи?{" "}
                    <Link to={'/register'} className="underline underline-offset-4">
                        Зарегистрироваться
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

            </form>
        </Form>
    )
}
