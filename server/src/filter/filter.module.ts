import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterResolver } from './filter.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter, } from './entities/filter.entity';
import { OrderByField } from './entities/orderBy.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  providers: [FilterResolver, FilterService],
  imports: [
    TypeOrmModule.forFeature([Filter, OrderByField, User])
  ],
  exports: [FilterService]
})
export class FilterModule { }
