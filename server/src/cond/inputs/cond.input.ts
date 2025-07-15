import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { StatusInput } from "../../status/inputs/status.input";
import { GroupInput } from "src/groups/inputs/group.input";
import { UserInput } from "src/users/dto/user.input";
import { User } from "src/users/entities/user.entity";
import { InputUser } from "./user_cond.input";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class CondInput {
    // @Field(() => StatusInput, { description: "Идентификатор родительского статуса", nullable: true })
    // parent: StatusInput

    @Field(() => [InputID], { description: "Группы пользователей", nullable: true })
    groups: InputID[]

    @Field(() => [InputUser], { description: "Список выбранных пользователей", nullable: true })
    users: InputUser[]

    @Field(() => Boolean, { description: "Флаг авторa задачи", nullable: true })
    author: boolean

    @Field(() => Boolean, { description: "Флаг исполнителя задачи", nullable: true })
    asignee: boolean
}