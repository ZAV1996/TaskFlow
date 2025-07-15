import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RiskType {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    description: string;

    @Field(() => String)
    category: string;

    @Field(() => Float,)
    probability: number; // 0-1
    
    @Field(() => Int)
    impact: number; // 1-5

    @Field(() => String)
    mitigationPlan: string;

    @Field(() => String)
    status: string; // open, mitigated, realized
}
