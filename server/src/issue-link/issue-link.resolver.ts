import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IssueLinkService } from './issue-link.service';
import { CreateIssueLinkInput } from './inputs/createIssueLink.input';
import { IssueLinkType } from './types/issue-link.type';

@Resolver(() => IssueLinkType)
export class IssueLinkResolver {
  constructor(private readonly issueLinkService: IssueLinkService) { }

  @Mutation(() => IssueLinkType)
  createIssueLink(@Args('Input') createIssueLinkInput: CreateIssueLinkInput) {
    return this.issueLinkService.createIssueLink(createIssueLinkInput);
  }

  @Query(() => [IssueLinkType])
  getAllIssueLink() {
    return this.issueLinkService.getAllIssueLinks();
  }
}
