// src/risk/risk.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RiskService } from './risk.service';
import { Risk } from './entities/risk.entity';
import { CreateRiskInput } from './dto/create-risk.input';
import { UpdateRiskDto } from './dto/update-risk.input';
import { RiskType } from './types/risk.type';

@Resolver(() => RiskType)
export class RiskResolver {
  constructor(private readonly riskService: RiskService) { }

  @Mutation(() => RiskType)
  async createRisk(@Args('createRiskDto') createRiskDto: CreateRiskInput) {
    return await this.riskService.createRisk(createRiskDto);
  }

  @Query(() => [RiskType])
  async getAllRisks() {
    return await this.riskService.findAll();
  }

  @Query(() => RiskType)
  async getRisk(@Args('id') id: number) {
    return await this.riskService.findOne(id);
  }

  @Mutation(() => RiskType)
  async updateRisk(
    @Args('id') id: number,
    @Args('updateRiskDto') updateRiskDto: UpdateRiskDto,
  ) {
    return this.riskService.updateRisk(id, updateRiskDto);
  }

  @Mutation(() => Boolean)
  async removeRisk(@Args('id') id: number) {
    await this.riskService.removeRisk(id);
    return true;
  }
}
