import { Module } from '@nestjs/common';
import { ProjectRoleService } from './project-role.service';
import { ProjectRoleResolver } from './project-role.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRole } from './entities/project-role.entity';
import { Group } from 'src/groups/entities/group.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  providers: [ProjectRoleResolver, ProjectRoleService],
  imports: [
    TypeOrmModule.forFeature([ProjectRole, Group]),
  ]
})
export class ProjectRoleModule { }
