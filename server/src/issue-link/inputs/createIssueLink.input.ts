import { Field, InputType, Int } from "@nestjs/graphql";
import { LinkType } from "../entities/issue-link.entity";

@InputType()
export class CreateIssueLinkInput {
    @Field(() => Int)
    sourceIssueId: number;

    @Field(() => Int)
    targetIssueId: number;

    @Field(() => LinkType)
    linkType: LinkType;
}