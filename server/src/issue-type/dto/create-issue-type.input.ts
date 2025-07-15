import { InputType, Int, Field } from '@nestjs/graphql';
import { IssueTypeEntity } from '../entities/issue-type.entity';
import { InputID } from 'src/workflow/inputs/create.input';

@InputType()
export class CreateIssueTypeInput {
    @Field(() => String)
    name: string

    @Field(() => InputID)
    project: InputID

    @Field(() => String, { nullable: true })
    description?: string

    @Field(() => String)
    icon_url: string

    @Field(() => InputID)
    workflow: InputID
}
