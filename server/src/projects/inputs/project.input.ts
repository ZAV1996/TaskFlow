import { Field, Int, InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { UploadFileInput, uploadFileInputSchema } from 'src/file/input/upload-file.input';
import { FileUpload, GraphQLUpload, ReadStream, WriteStream } from 'graphql-upload-ts';


const FileUploadSchema = z.object({
    filename: z.string(),
    fieldName: z.string(),
    mimetype: z.string(),
    encoding: z.string(),
    createReadStream: z.function().args().returns(z.instanceof(ReadStream)),
    capacitor: z.instanceof(WriteStream),
});
export const ProjectInputSchema = z.object({
    ID: z.number(),
    project_name: z.string().trim().nonempty(),
    description: z.string().trim().optional(),
    lead: z.number(),
    key: z.string().trim(),
    image: FileUploadSchema
})

@InputType()
export class ProjectInput extends createZodDto(ProjectInputSchema) {
    @Field(() => Int, { description: 'id проекта' })
    ID: number;

    @Field(() => String, { description: "Имя проекта", nullable: false })
    project_name: string;

    @Field(() => String, { description: "Описание проекта", nullable: true })
    description: string;

    @Field(() => Int, { description: "Руководитель проекта", nullable: true })
    lead: number

    @Field(() => String, { description: 'Ключ проекта', nullable: true })
    key: string

    @Field(() => GraphQLUpload, { description: "Изображение проекта", nullable: true })
    image: FileUpload
}
