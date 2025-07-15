import { forwardRef, Module } from '@nestjs/common';
import { InitService } from './init.service';
import { GroupsModule } from 'src/groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionKey } from './entities/PermissionKeys.entity';
import { InitResolver } from './init.resolver';

@Module({
  providers: [InitService, InitResolver],
  imports: [
    forwardRef(() => GroupsModule),
    TypeOrmModule.forFeature([PermissionKey])
  ]
})
export class InitModule { }
