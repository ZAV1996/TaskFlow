import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IssueTypeService } from './issue-type.service';
import { IssueTypeEntity } from './entities/issue-type.entity';

@Resolver(() => IssueTypeEntity)
export class IssueTypeResolver {
  constructor(private readonly issueTypeService: IssueTypeService) { }

  @Mutation(() => IssueTypeEntity)
  getIssueTypeByID(@Args({ name: 'createIssueTypeInput', type: () => Int }) createIssueTypeInput: number) {
    return this.issueTypeService.getIssueTypeByID(createIssueTypeInput);
  }
}
