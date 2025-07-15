import { InputType, Int, Field } from '@nestjs/graphql';
import { ActivityLog } from '../entities/activity-log.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateActivityLogInput extends OmitType(ActivityLog, ["ID", "timestamp"]) {
}
