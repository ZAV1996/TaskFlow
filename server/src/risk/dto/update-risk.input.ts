import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class UpdateRiskDto {
  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => Float, { nullable: true })
  probability?: number;

  @Field(() => Float, { nullable: true })
  impact?: number;

  @Field({ nullable: true })
  mitigationPlan?: string;

  @Field({ nullable: true })
  status?: string; // open, mitigated, realized
}