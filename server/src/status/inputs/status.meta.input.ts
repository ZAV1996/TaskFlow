import { StatusStyleVariant } from "../entities/status.meta.entity";
import { Field, Float, InputType, Int } from "@nestjs/graphql";

@InputType()
export class StatusMetaInput {
    @Field(() => Float, { nullable: true, defaultValue: 0 })
    posX: number

    @Field(() => Float, { nullable: true, defaultValue: 0 })
    posY: number

    @Field(() => StatusStyleVariant, { nullable: true })
    variant: StatusStyleVariant
}