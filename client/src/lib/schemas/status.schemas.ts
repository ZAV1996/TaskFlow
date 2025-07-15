import z from 'zod'
import { InputIDSchema } from './InputID.schemas'

export const statusFormSchema = z.object({
    parent: InputIDSchema,
    title: z.string().trim(),
    is_finished: z.boolean().default(false),
    is_initial: z.boolean().default(false),
    on_process: z.boolean().default(false),
}).superRefine(({ is_finished, is_initial, on_process }, ctx) => {
    if (!is_finished && !is_initial && !on_process) {
        if (!is_finished)
            return ctx.addIssue({
                path: (['on_process']),
                code: 'custom',
                message: 'Должен быть выбран хотя бы один признак'
            })
    }
    if (is_finished && (is_initial || on_process)) {
        return ctx.addIssue({
            path: ['is_finished'],
            code: 'custom',
            message: 'Завершённый статус не может быть начальным или промежуточным'
        })
    }
})