import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ConditionType } from 'src/issues/types/AQL.type';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class SortType {
    @Field()
    field: string;

    @Field()
    order: 'ASC' | 'DESC';
}


@ObjectType()
export class FilterType {
    @Field(() => Int)
    ID: number;

    @Field()
    title: string;

    @Field(() => [ConditionType])
    conditions: ConditionType[];

    @Field({ nullable: true })
    logicalOperator?: 'AND' | 'OR';

    @Field(() => [SortType], { nullable: true }) // Добавляем поле для сортировки
    sort?: SortType[];

    @Field(() => User)
    owner: User
}
