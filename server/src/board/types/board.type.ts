import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ColumnBoardType } from "src/column-board/types/column-board.type";
import { FilterType } from "src/filter/types/filter.type";
import { User } from "src/users/entities/user.entity";

export enum board_type {
    sprint = "sprint",
    kanban = "kanban"
}
registerEnumType(board_type, { name: "Board_Type" })

@ObjectType()
export class BoardType {
    @Field(() => Int)
    ID: number

    @Field(() => String, { nullable: false })
    board_name: string

    @Field(() => board_type, { nullable: true })
    board_type: board_type

    @Field(() => User, { nullable: true })
    Owner: User

    @Field(() => Date, { nullable: true })
    create_date: Date

    @Field(() => Date, { nullable: true })
    update_date: Date

    @Field(() => FilterType, { nullable: true })
    filter: FilterType

    @Field(() => [ColumnBoardType], { nullable: true })
    columns: ColumnBoardType[]
}
