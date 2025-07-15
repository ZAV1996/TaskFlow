import z from 'zod'
import { InputIDSchema } from './InputID.schemas'
export const TransitionSchema = z.object({
    parent: InputIDSchema,
    to: InputIDSchema,
    title: z.string()
})