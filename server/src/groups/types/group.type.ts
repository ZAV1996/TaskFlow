import { Int, Field, ObjectType, Scalar, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class GroupType {
    @Field(() => Int, { description: "Идентификатор группы" })
    ID: number;

    @Field(() => String, { description: "Название группы" })
    group_name: string

    @Field(() => Date, { description: "Дата и время создания группы" })
    create_date: Date

    @Field(() => Date, { description: "Дата и время последнего обновления группы", nullable: true })
    updated_date: Date

    @Field(() => String, { description: "Описание группы", nullable: true })
    description: string
}