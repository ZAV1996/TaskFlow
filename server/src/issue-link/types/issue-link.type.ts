import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { LinkType } from "../entities/issue-link.entity";
import { Issue } from "src/issues/entities/issue.entity";
import { IssueType } from "src/issues/types/issue.type";
registerEnumType(LinkType, { name: "LinkType" })

@ObjectType()
export class IssueLinkType {
    @Field(() => Int)
    ID: number;

    @Field(() => LinkType)
    link_type: LinkType;

    // Связь Many-to-One: Одна IssueLink ссылается на одну исходную Issue
    @Field(() => IssueType) // issue.sourceIssueLinks - это обратная связь в Issue
    source_issue: IssueType;

    // Связь Many-to-One: Одна IssueLink ссылается на одну целевую Issue
    @Field(() => IssueType) // issue.targetIssueLinks - это обратная связь в Issue
    target_issue: IssueType;
}