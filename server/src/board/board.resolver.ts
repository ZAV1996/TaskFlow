import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { BoardType } from './types/board.type';
import { BoardInput } from './inputs/board.input';
import { BoardUpdateInput } from './inputs/update.input';
import { InputID } from 'src/workflow/inputs/create.input';

@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) { }

  // @Mutation(() => BoardType)
  // async createBoard(@Args('BoardInput') input: BoardInput) {
  //   return await this.boardService.createBoard(input);
  // }

  @Mutation(() => Boolean)
  async deleteBoard(@Args('Delete') input: InputID) {
    return await this.boardService.deleteBoard(input);
  }

  @Mutation(() => BoardType)
  async updateBoard(@Args('BoardUpdateInput') input: BoardUpdateInput) {
    return await this.boardService.updateBoard(input);
  }

  @Query(() => BoardType)
  async getBoardByID(@Args("BoardID", { type: () => Int }) ID: number) {
    return await this.boardService.getBoardByID(ID);
  }

  @Query(() => [BoardType])
  async getAllBoard() {
    return await this.boardService.getAllBoards();
  }
}
