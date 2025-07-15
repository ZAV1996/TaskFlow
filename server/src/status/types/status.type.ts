import { Field, Int, ObjectType } from "@nestjs/graphql";
import { WorkflowType } from "../../workflow/types/common/workflow.type";
import { CondType } from "../../cond/types/cond.type";
// import { Transition } from "src/transition/entities/transition.entity";
import { TransitionType } from "src/transition/types/transition.type";
import { StatusMetaType } from "./status.meta.type";

@ObjectType()
export class StatusType {
    @Field(() => Int, { description: "Идентификатор статуса" })
    ID: number

    @Field(() => WorkflowType, { description: "Идентификатор родительского бизнес-процесса", nullable: true })
    parent: WorkflowType

    @Field(() => String, { description: "Название статуса", nullable: true })
    title: string

    @Field(() => [TransitionType], { description: "Переходы статусов", nullable: true })
    transitions: TransitionType[]

    @Field(() => CondType, { description: "Доступ для перехода на этот статус", nullable: true })
    cond: CondType

    @Field(() => Boolean, { description: "Начальный статус", nullable: false, defaultValue: false })
    is_initial: boolean

    @Field(() => Boolean, { description: "Конечный статус", nullable: false, defaultValue: false })
    is_finished: boolean

    @Field(() => Boolean, { description: "Cтатус в процессе", nullable: false, defaultValue: false })
    on_process: boolean

    @Field(() => StatusMetaType, { description: "Метаданные статуса", nullable: false })
    status_meta: StatusMetaType

}