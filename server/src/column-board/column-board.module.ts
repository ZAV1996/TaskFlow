import { forwardRef, Module } from '@nestjs/common';
import { ColumnBoardService } from './column-board.service';
import { ColumnBoardResolver } from './column-board.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from './entities/column-board.entity';
import { BoardModule } from 'src/board/board.module';

@Module({
  providers: [ColumnBoardResolver, ColumnBoardService],
  imports: [
    TypeOrmModule.forFeature([BoardColumn]),
    forwardRef(() => BoardModule)
  ],
  exports: [
    ColumnBoardService
  ]
})
export class ColumnBoardModule { }
