import { forwardRef, Global, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Group } from './entities/group.entity';
import { AdminGuardModule } from 'src/common/guards/guard.module';
@Global()
@Module({
  providers: [GroupsResolver, GroupsService],
  imports: [
    TypeOrmModule.forFeature([Group]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AdminGuardModule),
  ],
  exports: [GroupsService]
})
export class GroupsModule { }
