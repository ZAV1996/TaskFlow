import { Field, InputType, PickType } from "@nestjs/graphql";
import { issueInputScheme } from "./issue.input";
import { InputID, InputIDSchema } from "src/workflow/inputs/create.input";

import z from 'zod'
import { createZodDto } from "nestjs-zod";

@InputType()
export class CreateIssueInput extends createZodDto(issueInputScheme.pick({
    project: true,
    author: true,
    assignee: true,
    parentIssue: true,
    due_date: true,
    components: true,
    description: true,
    issueType: true,
    title: true
}).partial({
    parentIssue: true,
    due_date: true,
    components: true,
    description: true,
    assignee: true,
    issueType: true
})) {
    @Field(() => InputID, { nullable: false })
    project: InputID

    @Field(() => InputID, { nullable: false })
    author: InputID;

    @Field(() => InputID, { nullable: true })
    assignee?: InputID;

    @Field(() => InputID, { nullable: true })
    parentIssue?: InputID;

    @Field(() => Date, { nullable: true })
    due_date?: Date;

    @Field(() => [InputID], { nullable: true })
    components?: InputID[];

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => InputID, { nullable: false })
    issueType: InputID

    @Field(() => String, { nullable: false })
    title: string
}
