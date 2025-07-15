import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminGuard } from './admin.guard';
import { Group } from 'src/groups/entities/group.entity';


@Module({
    providers: [AdminGuard],
    imports: [
        TypeOrmModule.forFeature([Group]),
    ],
    exports: [
        AdminGuard
    ]
})
export class AdminGuardModule { }
