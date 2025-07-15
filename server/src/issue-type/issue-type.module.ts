import { Global, Module } from '@nestjs/common';
import { IssueTypeService } from './issue-type.service';
import { IssueTypeResolver } from './issue-type.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueTypeEntity } from './entities/issue-type.entity';

@Global()
@Module({
  providers: [IssueTypeResolver, IssueTypeService],
  imports: [
    TypeOrmModule.forFeature([IssueTypeEntity])
  ],
  exports: [
    IssueTypeService
  ]
})
export class IssueTypeModule { }
