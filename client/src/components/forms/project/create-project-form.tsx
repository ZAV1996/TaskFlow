import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ComboboxDemo } from "@/components/examples/Combobox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/Textarea";
import { ProjectSchema, ProjectSchemaType } from "@/lib/schemas/project.schemas";
import { cn } from "@/lib/utils";
import { CREATE_PROJECT } from "@/services/project.service";
import { GET_CURRENT_USER, UPDATE_MY_PROFILE } from "@/services/user.service";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarImage } from "@radix-ui/react-avatar";
import React, { Dispatch, useCallback, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form"
import z from "zod"
import UserCombobox from "../ui/user-combobox";
import { Navigate } from "react-router";

export type CreateProjectFormHandle = {
    submitForm: () => Promise<void>;
};
const CreateProjectForm = React.forwardRef<
    CreateProjectFormHandle,
    React.HTMLAttributes<HTMLFormElement>>(({
        className,
        ...props
    }: React.ComponentPropsWithoutRef<"form">, ref) => {
        const [imageSrc, setImageSrc] = useState<string | null>(null);
        const [createProject, { data }] = useMutation(CREATE_PROJECT);
        const query = useQuery(GET_CURRENT_USER);
        const user = query.data?.getCurrentUser

        const form = useForm<ProjectSchemaType>({
            resolver: zodResolver(ProjectSchema),
            defaultValues: {
                project_name: '',
                key: '',
                image: undefined,
                description: '',
                lead: undefined
            },
        });

        const onSubmit = useCallback(async (values: ProjectSchemaType) => {
            createProject({
                variables: values
            })
        }, [createProject]);

        useImperativeHandle(ref, () => ({
            submitForm: form.handleSubmit(onSubmit),
        }));
        const handleFileChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>, onChange: (file: File) => void) => {
                const file = event.target.files?.[0]
                if (file && event.target.validity.valid) {
                    onChange(file)
                    const url = URL.createObjectURL(file);
                    setImageSrc(url);
                } else {
                    setImageSrc(null);
                }
            }, []
        )
        if (user)
            return (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6 text-text", className)} {...props}>
                        <div className="flex gap-2 items-end">
                            <Avatar variant={"middle"}>
                                <AvatarFallback>
                                    <div className="flex items-center justify-center w-full h-48 bg-background-tertiary rounded-sm sm:w-96 dark:bg-gray-700 animate-pulse">
                                        <svg className="w-16 h-16 text-text-secondary dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg>
                                    </div>
                                </AvatarFallback >
                                {imageSrc ? <AvatarImage src={imageSrc} /> : <></>}
                            </Avatar >
                            <FormField
                                control={form.control}
                                rules={{ required: true }}
                                name="image"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <div className="flex">
                                            <FormLabel>Изображение проекта</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Выберите изображение проекта"
                                                type={'file'}
                                                size="none"
                                                onChange={(e) => handleFileChange(e, field.onChange)} />
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
                                name="lead"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel>Рукводитель проекта</FormLabel>
                                        </div>
                                        <FormControl className="relative">
                                            <UserCombobox form={form} />
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
                                name="project_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel>Название проекта</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Введите название проекта" type={'text'} {...field} />
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
                                name="key"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel>Ключ проекта</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Введите ключ проекта" type={'text'} {...field} />
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Описание проекта</FormLabel>
                                        <FormControl>
                                            <TextArea placeholder="Введите описание проекта" {...field} />
                                            {/* <Input placeholder="Введите отчество" {...field} /> */}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </form>
                </Form >
            )
    })
export default CreateProjectForm
