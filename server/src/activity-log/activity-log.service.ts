import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { CreateActivityLogInput } from './dto/create-activity-log.input';
import { InputID } from 'src/workflow/inputs/create.input';
import { Operator } from 'src/filter/inputs/filter.input';

interface QueryConditions {
  user?: InputID;
  handlerName?: string;
  timestamp?: { value: Date; operator: Operator };
  ipAddress?: string;
}

@Injectable()
export class ActivityLogService {
  activityLogRepository = this.dataSource.getRepository(ActivityLog);

  constructor(private dataSource: DataSource) { }

  async addActivityLog(params: CreateActivityLogInput) {
    const { user, argument, handlerName, ipAddress } = params;

    const newLog = this.activityLogRepository.create({
      user: user,
      argument,
      handlerName,
      ipAddress,
    });

    return await this.activityLogRepository.save(newLog);
  }


  async getRequiredData(conditions: QueryConditions) {
    const builder = this.activityLogRepository.createQueryBuilder('log')
    if (conditions.user) {
      builder.andWhere('log.userId = :userId', { userId: conditions.user.ID });
    }

    if (conditions.handlerName) {
      builder.andWhere('log.handlerName = :handlerName', { handlerName: conditions.handlerName });
    }

    if (conditions.timestamp) {
      const { value, operator = '>=' } = conditions.timestamp;
      builder.andWhere(`log.timestamp ${operator} :timestamp`, { timestamp: value });
    }

    if (conditions.ipAddress) {
      builder.andWhere('log.ipAddress = :ipAddress', { ipAddress: conditions.ipAddress });
    }
    builder.orderBy('log.timestamp', 'DESC')

    const result = await builder.getMany();
    return result;
  }
}
