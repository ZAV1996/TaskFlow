import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ReorderColumnInput {
    @Field(() => Int)
    ID: number;

    @Field(() => Int)
    position: number;
}

