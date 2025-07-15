import z from 'zod'
import { IMAGE_SCHEMA } from './image.schemas'

export const ProjectSchema = z.object({
    project_name: z.string().trim(),
    description: z.string().trim(),
    key: z.string().trim().toUpperCase(),
    lead: z.number(),
    image: IMAGE_SCHEMA.optional()
})
export type ProjectSchemaType = z.infer<typeof ProjectSchema>