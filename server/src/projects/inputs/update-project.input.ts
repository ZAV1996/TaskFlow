import { InputID } from 'src/workflow/inputs/create.input';
import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { ProjectInputSchema } from './project.input';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => Int)
  ID: number;

  @Field(() => InputID, { nullable: true })
  workflow?: InputID
}
