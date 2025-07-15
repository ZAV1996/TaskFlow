import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity-log.entity';

@Module({
  providers: [ActivityLogService],
  imports: [
    TypeOrmModule.forFeature([ActivityLog])
  ],
  exports: [
    ActivityLogService
  ]
})
export class ActivityLogModule { }
