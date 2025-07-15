// src/risk/risk.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Risk } from './entities/risk.entity';
import { CreateRiskInput } from './dto/create-risk.input';
import { UpdateRiskDto } from './dto/update-risk.input';

@Injectable()
export class RiskService {
  constructor(
    @InjectRepository(Risk)
    private readonly riskRepository: Repository<Risk>,
  ) { }

  async createRisk(createRiskDto: CreateRiskInput) {
    const risk = this.riskRepository.create(createRiskDto);
    return await this.riskRepository.save(risk);
  }

  async findAll() {
    return await this.riskRepository.find();
  }

  async findOne(id: number) {
    return await this.riskRepository.findOne({ where: { id } });
  }

  async updateRisk(id: number, updateRiskDto: UpdateRiskDto) {
    await this.riskRepository.update(id, updateRiskDto);
    return await this.findOne(id);
  }

  async removeRisk(id: number) {
    await this.riskRepository.delete(id);
  }
}
