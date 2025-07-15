import { Module } from '@nestjs/common';
import { CondService } from './cond.service';
import { CondResolver } from './cond.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cond } from './entities/cond.entity';

@Module({
  providers: [CondResolver, CondService],
  imports: [
    TypeOrmModule.forFeature([Cond])
  ],
  exports: [
    CondService
  ]
})
export class CondModule { }
