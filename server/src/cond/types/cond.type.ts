import { Field, Int, ObjectType } from "@nestjs/graphql";
import { GroupType } from "src/groups/types/group.type";
import { User } from "src/users/entities/user.entity";
import { StatusType } from "src/status/types/status.type";

@ObjectType()
export class CondType {
    @Field(() => Int, { description: "Идентификатор правила перехода на статус" })
    ID: number

    @Field(() => StatusType, { description: "Идентификатор родительского статуса", nullable: true },)
    parent: StatusType

    @Field(() => [GroupType], { description: "Группы пользователей", nullable: true })
    groups: GroupType[]

    @Field(() => [User], { description: "Список выбранных пользователей", nullable: true })
    users: User[]

    @Field(() => Boolean, { description: "Автор задачи", nullable: true })
    author: boolean

    @Field(() => Boolean, { description: "Исполнитель задачи", nullable: true })
    asignee: boolean
}