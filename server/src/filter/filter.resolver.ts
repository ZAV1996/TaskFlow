import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FilterService } from './filter.service';
import { Filter } from './entities/filter.entity';
import { FilterType } from './types/filter.type';
import { InputID } from 'src/workflow/inputs/create.input';
import { FilterInput } from 'src/filter/inputs/filter.input';

@Resolver(() => FilterType)
export class FilterResolver {
  constructor(private readonly filterService: FilterService) { }

  @Mutation(() => FilterType)
  async createFilter(@Args('input') input: FilterInput) {
    return this.filterService.createFilter(input);
  }
  @Mutation(() => Boolean)
  async deleteFilter(@Args('input') input: InputID) {
    await this.filterService.deleteFilter(input.ID);
    return true;
  }

  @Query(() => [FilterType])
  async getAllFilters() {
    return this.filterService.getAllFilters();
  }


  @Query(() => FilterType)
  async getFilterById(@Args('id') id: number) {
    return this.filterService.getFilterByID(id);
  }

  @Query(() => Int)
  TEST(@Args("TEST") input: FilterInput) {
    return 123;//this.filterService.filterIssue(input)
  }

}
