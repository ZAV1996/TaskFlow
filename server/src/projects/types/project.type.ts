import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload-ts';
import { FileEntity } from 'src/file/entities/file.entity';
import { IssueTypeEntity } from 'src/issue-type/entities/issue-type.entity';
import { IssueType } from 'src/issues/types/issue.type';
import { PermissionSchemeType } from 'src/permission-scheme/types/permission-scheme.type';
import { ProjectComponentType } from 'src/project-components/types/project-component.type';
import { RiskType } from 'src/risk/types/risk.type';
import { User } from 'src/users/entities/user.entity';
import { WorkflowType } from 'src/workflow/types/common/workflow.type';
@ObjectType()
export class ProjectType {
    @Field(() => Int, { description: 'id проекта' })
    ID: number;

    @Field(() => String, { description: "Имя проекта", nullable: false })
    project_name: string;

    @Field(() => String, { description: "Описание проекта", nullable: true })
    description: string;

    @Field(() => User, { description: "Руководитель проекта", nullable: true })
    lead: User

    @Field(() => String, { description: 'Ключ проекта', nullable: false })
    key: string

    @Field(() => FileEntity, { description: "Изображение проекта", nullable: true })
    image: FileEntity //url

    @Field(() => IssueTypeEntity, { description: "Типы задач проета", nullable: true })
    issue_types: IssueTypeEntity

    @Field(() => [ProjectComponentType], { description: "Компоненты проекта", nullable: true })
    components: ProjectComponentType[]

    @Field(() => [IssueType], { description: "Задачи проекта", nullable: true })
    issues: IssueType[]

    @Field(() => [RiskType], { description: "Риски проекта", nullable: true })
    risk: RiskType[]

    @Field(() => PermissionSchemeType, { nullable: true })
    permissionScheme: PermissionSchemeType
}
