import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CondService } from './cond.service';
import { Cond } from './entities/cond.entity';
import { CondType } from './types/cond.type';
import { InputID } from 'src/workflow/inputs/create.input';
import { CreateOrUpdateCondInput } from './inputs/createOrUpdate.input';

@Resolver(() => Cond)
export class CondResolver {
  constructor(private readonly condService: CondService) { }

  @Mutation(() => CondType)
  async createOrUpdateCond(@Args("createOrUpdateCondInput") input: CreateOrUpdateCondInput) {
    return await this.condService.createOrUpdateCond(input);
  }

  @Mutation(() => [String])
  async deleteCond(@Args("deleteCondInput") input: InputID) {
    return await this.condService.deleteCond(input);
  }

  @Query(() => [CondType])
  async getAllConds() {
    return await this.condService.getAllConds()
  }

  @Query(() => CondType)
  async getCondByID(@Args("CondID") input: InputID) {
    return await this.condService.getCondByID(input)
  }
} 
