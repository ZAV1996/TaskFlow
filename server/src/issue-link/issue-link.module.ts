import { Module } from '@nestjs/common';
import { IssueLinkService } from './issue-link.service';
import { IssueLinkResolver } from './issue-link.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueLink } from './entities/issue-link.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { Status } from 'src/status/entities/status.entity';

@Module({
  providers: [IssueLinkResolver, IssueLinkService],
  imports: [
    TypeOrmModule.forFeature([
      IssueLink,
      Issue, Status
    ])
  ],
  exports: [IssueLinkService]
})
export class IssueLinkModule { }
