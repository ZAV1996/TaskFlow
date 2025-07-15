import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardInput } from './inputs/board.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { ColumnBoardService } from 'src/column-board/column-board.service';
import { BoardType } from './types/board.type';
import { BoardUpdateInput } from './inputs/update.input';
import { InputID } from 'src/workflow/inputs/create.input';
import { BoardColumn } from 'src/column-board/entities/column-board.entity';


@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board) private boardRepository: Repository<Board>,
        @InjectRepository(BoardColumn) private columnRepository: Repository<BoardColumn>,
    ) { }

    // async createBoard({ ID, Owner, board_name, board_type, filter }: BoardInput) {
    //     const board = await this.boardRepository.save({ board_name, board_type, filter, Owner }) as BoardType
    //     if (board) {
    //         await this.columnRepository.save([
    //             { board, column_name: "Назначено", column_position: 0 },
    //             { board, column_name: "В работе", column_position: 1 },
    //             { board, column_name: "Выполнено", column_position: 2 }
    //         ])
    //     }
    //     return board;
    // }

    async getBoardByID(ID: number) {
        const board = await this.boardRepository.findOne({ where: { ID }, relations: ['columns', "filter", "Owner"] })
        if (!board) {
            throw new NotFoundException(`Доска с ID ${ID} не найдена`)
        }
        return board
    }

    async updateBoard({ ID, Owner, board_name, filter, columns }: BoardUpdateInput) {
        return await this.boardRepository.save({ ID, Owner, board_name, filter, columns })
    }

    async getAllBoards() {
        return await this.boardRepository.find();
    }

    async deleteBoard(input: InputID) {
        await this.boardRepository.delete(input)
        return true
    }


}
