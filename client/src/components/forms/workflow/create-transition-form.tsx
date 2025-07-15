import { useStatuses } from "@/components/hooks/workflow/useStatuses";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { TransitionSchema } from "@/lib/schemas/transition.schemas";
import { useForm } from "react-hook-form"
import z from 'zod';
import StatusCombobox from "../ui/status-combobox";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { wfContext } from "@/components/drawers/workflow/WorkflowDriver";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSITION, GET_ALL_TRANSITIONS_BY_WORKFLOW_ID } from "@/services/workflow";
import { HandleTypeId, InputId } from "@/types/graphql";

export default function CreateTransitionForm() {

    const ID = Number(new URLSearchParams(location.search).get('id'));
    const [mutate] = useMutation(CREATE_TRANSITION)
    const ctx = useContext(wfContext)
    const form = useForm<z.infer<typeof TransitionSchema>>({
        resolver: zodResolver(TransitionSchema),
        defaultValues: {
            title: "",
            to: { ID: Number(ctx?.params?.target) },
            parent: { ID: Number(ctx?.params?.source) }
        }
    })
    function onSubmit(values: z.infer<typeof TransitionSchema>) {
        if (!ctx?.edges.some((edge) => edge.id === `${values.parent.ID}->${values.to.ID}`)) {
            mutate({
                variables: {
                    createOrUpdateTransitionInput: {
                        parent: { ID: values.parent.ID },
                        title: values.title,
                        to: { ID: values.to.ID },
                        transition_meta: {
                            sourceHandle: ctx?.params?.sourceHandle as HandleTypeId ?? HandleTypeId.Sr,
                            targetHandle: ctx?.params?.targetHandle as HandleTypeId ?? HandleTypeId.Tl
                        },
                    }
                },
                refetchQueries: [
                    {
                        query: GET_ALL_TRANSITIONS_BY_WORKFLOW_ID,
                        variables: {
                            ID
                        }
                    }
                ]
            })
            ctx?.setParams(null)
            ctx?.setIsOpenTransitionModal(false)
        }
    }
    return (
        <div onClick={e => e.stopPropagation()}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: false }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название перехода</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Введите название перехода" {...field} />
                                    </FormControl>
                                    <FormDescription>Например: Взять в работу</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="parent.ID"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Начальный статус</FormLabel>
                                    <FormControl>
                                        <StatusCombobox
                                            value={field.value}
                                            onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="to.ID"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Конечный статус</FormLabel>
                                    <FormControl>
                                        <StatusCombobox
                                            value={field.value}
                                            onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            <Plus />
                            Добавить переход
                        </Button>
                    </div>
                </form>
            </Form>
        </div >
    )
}
