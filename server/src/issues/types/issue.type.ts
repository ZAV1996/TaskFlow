import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Cond } from "src/cond/entities/cond.entity";
import { CondType } from "src/cond/types/cond.type";
import { IssueTypeEntity } from "src/issue-type/entities/issue-type.entity";
import { ProjectComponent } from "src/project-components/entities/project-component.entity";
import { ProjectComponentType } from "src/project-components/types/project-component.type";
import { Project } from "src/projects/entities/project.entity";
import { ProjectType } from "src/projects/types/project.type";
import { Status } from "src/status/entities/status.entity";
import { StatusType } from "src/status/types/status.type";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class IssueType {

    @Field(() => Int, { nullable: true, description: "Идентификатор запроса" })
    ID: number

    @Field(() => ProjectType, { description: "Проект, к которому принадлежит запрос", nullable: true })
    project: Project

    @Field(() => String, { description: "Ключ запроса", nullable: true })
    key: string

    @Field(() => Int, { description: "Номер запроса", nullable: false })
    issueNum: number

    @Field(() => IssueTypeEntity, { description: "Тип запроса", nullable: true })
    issueType?: IssueTypeEntity

    @Field(() => User, { nullable: true, description: "Пользователь, который внес запрос в систему" })
    author?: User

    @Field(() => User, { nullable: true, description: "Исполнитель для работы над запросом" })
    assignee?: User

    @Field(() => String, { description: "Сводка", nullable: true })
    title: string

    @Field(() => String, { nullable: true, description: "Описание запроса" })
    description?: string

    @Field(() => [ProjectComponentType], { nullable: true, description: "Компоненты в рамках проекта, которые связанны с данным запросом" })
    components?: ProjectComponentType[]


    @Field(() => String, { description: "Приоритет запроса", nullable: true })
    priority: "Высокий" | "Средний" | "Низкий"

    @Field(() => StatusType, { description: "Текущее состояние запроса" })
    status: Status

    @Field(() => IssueType, { nullable: true, description: "Родительская запрос" })
    parentIssue?: IssueType

    @Field(() => [IssueType], { nullable: true, description: "Дочерние запросы" })
    childrenIssues?: IssueType[]

    @Field(() => Date, { description: "Дата и время создания запроса" })
    create_date: Date

    @Field(() => Date, { nullable: true, description: "Дата и время последнего обновления запроса" })
    update_date?: Date

    @Field(() => Date, { nullable: true, description: "Срок исполнения запроса" })
    due_date: Date
}
