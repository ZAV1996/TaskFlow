import { Module } from '@nestjs/common';
import { RiskService } from './risk.service';
import { RiskResolver } from './risk.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Risk } from './entities/risk.entity';

@Module({
  providers: [RiskResolver, RiskService],
  imports: [TypeOrmModule.forFeature([Risk])],
})
export class RiskModule { }
