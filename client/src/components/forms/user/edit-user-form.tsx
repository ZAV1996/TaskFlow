import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { UserSchema, type UserSchemaType } from "@/lib/schemas/user.schemas";
import { cn } from "@/lib/utils";
import { GET_CURRENT_USER, UPDATE_MY_PROFILE } from "@/services/user.service";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form"
import z from "zod"

export type EditProfileFormHandle = {
    submitForm: () => Promise<void>,
};
const EditProfileForm = React.forwardRef<
    EditProfileFormHandle,
    React.HTMLAttributes<HTMLFormElement>>(({
        className,
        ...props
    }: React.ComponentPropsWithoutRef<"form">, ref) => {
        const [updateProfile] = useMutation(UPDATE_MY_PROFILE,
            {
                update(cache, { data }) {
                    cache.writeQuery({
                        query: GET_CURRENT_USER,
                        data: { getCurrentUser: data?.updateMyProfile }
                    })
                }
            }
        );
        const query = useQuery(GET_CURRENT_USER);
        const user = query.data?.getCurrentUser

        const userFormSchema = UserSchema.omit({
            password: true,
            isActivated: true,
            email: true,
        })
        const form = useForm<UserSchemaType>({
            resolver: zodResolver(userFormSchema),
            defaultValues: {
                department: user?.department ?? "",
                name: user?.name ?? "",
                patronymic: user?.patronymic ?? "",
                surname: user?.surname ?? "",
                ID: user?.ID
            },
        });

        const onSubmit = useCallback(async (values: z.infer<typeof userFormSchema>) => {
            await updateProfile({ variables: values });
        }, [updateProfile]);

        useImperativeHandle(ref, () => ({
            submitForm: form.handleSubmit(onSubmit),
        }));

        if (user)
            return (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6 text-text", className)} {...props}>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                rules={{ required: false }}
                                name="surname"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel>Фамилия</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Введите фамилию" type={'text'} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                rules={{ required: false }}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel>Имя</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Введите имя" type={'text'} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                rules={{ required: false }}
                                name="patronymic"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel>Отчество</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Введите отчество" type={'text'} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                rules={{ required: false }}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel>Место работы</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Введите место работы" type={'text'} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            )
    })
export default EditProfileForm
