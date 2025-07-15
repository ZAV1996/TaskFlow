import { wfContext } from "@/components/drawers/workflow/WorkflowDriver"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { statusFormSchema } from "@/lib/schemas/status.schemas"
import { CREATE_STATUS, GET_ALL_STATUSES_BY_WORKFLOW_ID } from "@/services/workflow"
import { StatusStyleVariant } from "@/types/graphql"
import { useMutation } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Flag, Plus, RefreshCw } from "lucide-react"
import { useContext, useId } from "react"
import { useForm } from "react-hook-form"
import z from 'zod'
export default function CreateStatusForm() {
    const [mutate, { data }] = useMutation(CREATE_STATUS)
    const ID = Number(new URLSearchParams(location.search).get('id'));
    let id = 1;
    const getId = () => `${id++}`;
    const ctx = useContext(wfContext)
    const form = useForm<z.infer<typeof statusFormSchema>>({
        resolver: zodResolver(statusFormSchema),
        defaultValues: {
            title: '',
            parent: { ID }
        }
    })

    function onSubmit(values: z.infer<typeof statusFormSchema>) {
        mutate({
            variables: {
                createStatusInput: {
                    parent: { ID },
                    is_finished: values.is_finished,
                    is_initial: values.is_initial,
                    on_process: values.on_process,
                    title: values.title,
                    status_meta: {
                        posX: 0,
                        posY: 0,
                        variant: (values.on_process && values.is_initial) ? StatusStyleVariant.Primary : values.on_process ? StatusStyleVariant.Warning : values.is_finished ? StatusStyleVariant.Success : StatusStyleVariant.Default
                    }
                }
            },
            refetchQueries: [
                {
                    query: GET_ALL_STATUSES_BY_WORKFLOW_ID, variables: {
                        ID,
                    }
                }
            ]
        })
    }
    return (
        <div onClick={e => e.stopPropagation()}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Введите название статуса</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Название статуса"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_initial"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={(e) => field.onChange(e)} />
                                    </FormControl>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <FormLabel className="cursor-pointer">Начальный статус</FormLabel>
                                        </TooltipTrigger>
                                        <TooltipContent asChild className="p-0" align="center" side="right">
                                            <Alert variant={'default'}>
                                                <AlertTitle className="flex items-center gap-2">
                                                    <Flag className="size-5" />
                                                    Начальный статус
                                                </AlertTitle>
                                                <Separator className="my-2" />
                                                <AlertDescription>
                                                    <ul className="ml-6 list-disc [&>li]:mt-2 first:[&>li]:mt-0 text-wrap">
                                                        <li>При создании задачи, ей автоматически присваивается статус с этим признаком.</li>
                                                        <li>В рамках одного бизнес-процесса может быть только один статус с этим признаком.</li>
                                                        <li>Если в бизнес-процессе уже есть статус с этим признаком, то новый статус с выбранным признаком отменит признак существующего статуса.</li>
                                                    </ul>
                                                </AlertDescription>
                                            </Alert>
                                        </TooltipContent>
                                    </Tooltip>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="on_process"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={(e) => field.onChange(e)} />
                                    </FormControl>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <FormLabel className="cursor-pointer">Промежуточный статус</FormLabel>
                                        </TooltipTrigger>
                                        <TooltipContent asChild className="p-0" align="center" side="right">
                                            <Alert variant={'warning'}>
                                                <AlertTitle className="flex items-center gap-2">
                                                    <RefreshCw className="size-5" />
                                                    Промежуточный статус  (в процессе, активный)
                                                </AlertTitle>
                                                <Separator className="my-2" />
                                                <AlertDescription>
                                                    <ul className="ml-6 list-disc [&>li]:mt-2 first:[&>li]:mt-0 text-wrap">
                                                        <li>Статусов с этим признаком может быть не ограниченное количество.</li>
                                                        <li>Обозначает, что работа над задачами, имеющими статус с этим признаком не завершена.</li>
                                                    </ul>
                                                </AlertDescription>
                                            </Alert>
                                        </TooltipContent>
                                    </Tooltip>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_finished"
                            render={({ field }) => (
                                <div>
                                    <FormItem className="flex items-center gap-2 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={(e) => field.onChange(e)} />
                                        </FormControl>

                                        <div className="flex flex-col">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <FormLabel className="cursor-pointer">Завершенный статус</FormLabel>
                                                </TooltipTrigger>
                                                <TooltipContent asChild className="p-0" align="center" side="right">
                                                    <Alert variant={'success'}>
                                                        <AlertTitle className="flex items-center gap-2">
                                                            <CheckCircle2 className="size-5" />
                                                            Завершенный статус
                                                        </AlertTitle>
                                                        <Separator className="my-2" />
                                                        <AlertDescription>
                                                            <ul className="ml-6 list-disc [&>li]:mt-2 first:[&>li]:mt-0">
                                                                <li className="text-wrap">В рамках одного бизнес-процесса может быть только один статус с этим признаком.</li>
                                                                <li className="text-wrap">Если в бизнес-процессе уже есть статус с этим признаком, то новый статус с выбранным признаком отменит признак существующего статуса.</li>
                                                                <li>Обозначает, что работа над задачами, имеющими статус с этим признаком завершена.</li>
                                                            </ul>
                                                        </AlertDescription>
                                                    </Alert>
                                                </TooltipContent>
                                            </Tooltip>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                </div>
                            )}
                        />
                        <Button type="submit"><Plus />Добавить статус</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
