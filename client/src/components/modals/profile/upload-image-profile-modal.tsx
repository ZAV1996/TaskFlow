import { Button } from "@/components/ui/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { PenBox } from "lucide-react"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@apollo/client"
import { GET_CURRENT_USER, SET_AVATAR } from "@/services/user.service"
import { useCallback } from "react"
import { IMAGE_SCHEMA, type ImageSchemaType } from "@/lib/schemas/image.schemas"
import { Separator } from "@/components/ui/separator"
import { TypographyMuted } from "@/components/ui/Typography"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"

export default function UploadImageProfileModal() {
    const [uploadImage] = useMutation(SET_AVATAR);


    const UploadImageSchema = z.object({
        file: IMAGE_SCHEMA
    })

    const form = useForm<z.infer<typeof UploadImageSchema>>({
        resolver: zodResolver(UploadImageSchema),
        defaultValues: {
            file: undefined
        },
    });

    const onSubmit = async (values: ImageSchemaType) => {
        if (values.file)
            try {
                const formData = new FormData()
                formData.append("file", values.file)
                await uploadImage({
                    variables: { file: values.file },
                    context: {
                        hasUpload: true
                    },
                    update(cache, { data }) {
                        cache.writeQuery({
                            query: GET_CURRENT_USER,
                            data: { getCurrentUser: data?.setAvatar! }
                        })
                    }
                })
            } catch (error) {
                console.error("Ошибка загрузки:", error)
            }
    }

    // Обработчик изменения файла
    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, onChange: (file: File) => void) => {
            const file = event.target.files?.[0]
            if (file && event.target.validity.valid) {
                onChange(file)
            }
        }, []
    )

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Изменить <PenBox /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Загрузить изображение</DialogTitle>
                    <Separator orientation="horizontal" />
                    <DialogDescription asChild={true}>
                        <TypographyMuted>Внесите изменения в свой профиль здесь. Нажмите «Сохранить», когда закончите.</TypographyMuted>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-2 mb-5">
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel>Выберите изображение</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                size="none"
                                                accept="image/jpeg,image/png,image/webp"
                                                onChange={(e) => handleFileChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Размер файла – не более 10 МБ.  PNG, JPG, WEBP
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                variant={"ghost"}
                                type="reset"
                                onClick={() => {
                                    form.setValue('file', undefined)
                                }}
                            >
                                Сбросить
                            </Button>
                            <DialogTrigger asChild>
                                <Button variant={"outline"} onClick={() => {
                                    form.setValue('file', undefined)
                                }}>Отмена</Button>
                            </DialogTrigger>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? "Загрузка..." : "Сохранить"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}