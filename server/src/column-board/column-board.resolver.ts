import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColumnBoardService } from './column-board.service';
import { BoardColumn } from './entities/column-board.entity';
import { CreateColumnInput } from './inputs/create.input';
import { ColumnInput } from './inputs/columns.input';
import { ColumnBoardType } from './types/column-board.type';
import { UpdateColumnInput } from './inputs/update.input';
import { ReorderColumnInput } from './inputs/reorder.input';
// import { ReorderColumnInput } from './inputs/reorder.input';


@Resolver(() => ColumnBoardType)
export class ColumnBoardResolver {
  constructor(private readonly columnBoardService: ColumnBoardService) { }

  @Mutation(() => ColumnBoardType)
  async createColumn(@Args("ColumnInput") input: CreateColumnInput) {
    return await this.columnBoardService.createColumn(input)
  }

  @Mutation(() => ColumnBoardType)
  async updateColumn(@Args("ColumnUpdateInput") input: UpdateColumnInput) {
    const { column_name, column_position, statuses, ID } = input;
    const updateData: any = {};

    if (column_name !== undefined) {
      updateData.column_name = column_name;
    }
    if (column_position !== undefined) {
      updateData.column_position = column_position;
    }
    if (statuses !== undefined) {
      updateData.statuses = statuses;
    }
    return await this.columnBoardService.updateColumn(ID, updateData)
  }

  @Query(() => [ColumnBoardType])
  async getColumnsByBoardID(@Args({ type: () => Int, name: 'ID' }) ID: number) {
    return await this.columnBoardService.getColumnsByBoardID(ID);
  }

}
