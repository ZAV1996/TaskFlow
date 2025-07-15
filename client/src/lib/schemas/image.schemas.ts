import z from 'zod'
export const IMAGE_SCHEMA = z.any()
    .refine(
        (file) => !file || (file instanceof File),
        { message: "Требуется файл" }
    )
    .refine(
        (file) => file && file.size <= 10 * 1024 * 1024,
        { message: "Размер файла должен быть менее 10MB" }
    )
    .refine(
        (file) => file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        { message: "Допустимые форматы: .jpeg, .png, .webp" }
    )
export type ImageSchemaType = z.infer<typeof IMAGE_SCHEMA>