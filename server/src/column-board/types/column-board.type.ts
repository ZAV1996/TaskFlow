import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BoardType } from "src/board/types/board.type";
import { StatusType } from "src/status/types/status.type";

@ObjectType()
export class ColumnBoardType {
    @Field(() => Int, { nullable: true })
    ID: number;

    @Field(() => String, { nullable: true })
    column_name: string;

    @Field(() => [StatusType], { nullable: true })
    statuses: StatusType[];

    @Field(() => BoardType, { nullable: false })
    board: BoardType

    @Field(() => Int)
    column_position: number

}