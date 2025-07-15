import { Field, Int, ObjectType } from "@nestjs/graphql";
import { StatusType } from "../../../status/types/status.type";
import { IssueTypeEntity } from "src/issue-type/entities/issue-type.entity";
import { GqlDate } from "src/users/entities/user.entity";

@ObjectType()
export class WorkflowType {

    @Field(() => Int, { description: "ID бизнес-процесса" })
    ID: number;

    @Field(() => String, { description: "Название бизнес-процесса" })
    title: string

    @Field(() => [IssueTypeEntity])
    issueType: IssueTypeEntity[]

    @Field(() => [StatusType], { description: "Массив статусов бизнес-процесса", nullable: true })
    statuses: StatusType[]

    @Field(() => String, { description: "Описание бизнес-процесса", nullable: true })
    description: string

    @Field(() => Date, { description: "Дата создания бизнес процесса" })
    create_date: Date

    @Field(() => Date, { description: "Дата обновления бизнес процесса" })
    update_date: Date
}
