import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn } from './entities/column-board.entity';
import { Repository } from 'typeorm';
import { CreateColumnInput } from './inputs/create.input';
import { UpdateColumnInput } from './inputs/update.input';
import { StatusInput } from 'src/status/inputs/status.input';
import { BoardService } from 'src/board/board.service';


@Injectable()
export class ColumnBoardService {
  constructor(
    @InjectRepository(BoardColumn) private boardColumnRepository: Repository<BoardColumn>,
    private boardService: BoardService
  ) {
  }

  async createColumn(input: CreateColumnInput) {
    const board = await this.boardService.getBoardByID(input.board.ID);
    if (!board) throw new NotFoundException("Доска не найдена");
    const columns = board.columns;

    return await this.boardColumnRepository.save({ ...input, column_position: columns.length });
  }


  async updateColumn(
    columnId: number,
    updateData: Partial<{
      column_name: string;
      column_position: number;
      statuses: StatusInput[];
    }>
  ) {
    const column = await this.boardColumnRepository.findOne({ where: { ID: columnId }, relations: ['statuses', 'board'] });
    if (!column) {
      throw new NotFoundException(`Колонка с идентификатором ${columnId} не найдена`);
    }

    if (updateData.column_position !== undefined) {
      const newPosition = updateData.column_position;
      const currentPosition = column.column_position;
      const boardId = column.board.ID;

      if (newPosition === currentPosition) {
        // Позиция не меняется, ничего не делаем
      } else {
        // Получаем все колонки доски
        const allColumns = await this.boardColumnRepository.find({ where: { board: { ID: boardId } } });

        if (newPosition < currentPosition) {
          // Перемещение вверх (в сторону 0)
          // Смещаем колонки, у которых позиция в диапазоне [newPosition, currentPosition -1]
          const columnsToShift = allColumns.filter(c =>
            c.column_position >= newPosition && c.column_position < currentPosition
          );

          for (const c of columnsToShift) {
            c.column_position += 1;
            await this.boardColumnRepository.save(c);
          }
        } else {
          // Перемещение вниз (в сторону большего числа)
          // Смещаем колонки, у которых позиция в диапазоне [currentPosition+1, newPosition]
          const columnsToShift = allColumns.filter(c =>
            c.column_position > currentPosition && c.column_position <= newPosition
          );

          for (const c of columnsToShift) {
            c.column_position -= 1;
            await this.boardColumnRepository.save(c);
          }
        }

        // Устанавливаем новую позицию текущей колонке
        column.column_position = newPosition;
      }
    }

    // Обновляем остальные поля
    Object.assign(column, updateData);
    return this.boardColumnRepository.save(column);
  }


  // Получить все колонки доски
  async getColumnsByBoardID(boardId: number) {
    return await this.boardColumnRepository.find({
      where: { board: { ID: boardId } },
      relations: ['statuses'],
      order: { column_position: 'ASC' },
    });
  }


}