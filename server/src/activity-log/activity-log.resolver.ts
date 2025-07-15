import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActivityLogService } from './activity-log.service';
import { ActivityLog } from './entities/activity-log.entity';
import { CreateActivityLogInput } from './dto/create-activity-log.input';
import { UpdateActivityLogInput } from './dto/update-activity-log.input';

@Resolver(() => ActivityLog)
export class ActivityLogResolver {
  constructor(private readonly activityLogService: ActivityLogService) {}


}
