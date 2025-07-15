import { Field, ObjectType } from "@nestjs/graphql";
import { Operator } from "src/filter/inputs/filter.input";

@ObjectType()
export class ConditionType {
    @Field({ nullable: true })
    field: string;

    @Field(() => Operator, { nullable: true }) // Используем enum
    operator: Operator;

    @Field({ nullable: true })
    value: string; // Значение для сравнения
}