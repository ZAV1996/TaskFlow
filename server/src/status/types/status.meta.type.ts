import { StatusStyleVariant } from "../entities/status.meta.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StatusMetaType {
    @Field(() => Int)
    ID: number

    @Field(() => Int)
    posX: number

    @Field(() => Int)
    posY: number

    @Field(() => StatusStyleVariant)
    variant: StatusStyleVariant
}