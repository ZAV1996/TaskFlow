import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardColumn } from 'src/column-board/entities/column-board.entity';

@Module({
  providers: [BoardResolver, BoardService],
  imports: [
    TypeOrmModule.forFeature([Board, BoardColumn]),
  ],
  exports: [BoardService]
})
export class BoardModule { }
