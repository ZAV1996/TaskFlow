import { Field, PartialType, PickType, InputType, Scalar, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { ProjectInput, ProjectInputSchema } from './project.input';
import { createZodDto } from 'nestjs-zod';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { UploadFileInput } from 'src/file/input/upload-file.input';

@InputType()
export class CreateProjectInput {
    @Field(() => String, { nullable: true, description: "Описание проекта" })
    description?: string

    @Field(() => GraphQLUpload, { nullable: true, description: "Изображение проекта" })
    image?: FileUpload

    @Field(() => String, { nullable: false, description: "Ключ проекта" })
    key: string

    @Field(() => Int, { nullable: false, description: "Руководитель проекта" })
    lead: number

    @Field(() => String, { nullable: false, description: "Имя проекта" })
    project_name: string
}
