import { CreateIssueTypeInput } from './create-issue-type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIssueTypeInput extends PartialType(CreateIssueTypeInput) {
  @Field(() => Int)
  id: number;
}
