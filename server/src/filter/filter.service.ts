import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { Filter } from './entities/filter.entity';
import { ConditionGroup, ConditionItem, FieldType, FilterInput, FunctionCall, LogicalOperator, Operator, SortOrder } from './inputs/filter.input';
import { InputID } from 'src/workflow/inputs/create.input';
import { OrderByField } from './entities/orderBy.entity';
import { User } from 'src/users/entities/user.entity';
import { Issue } from 'src/issues/entities/issue.entity';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Filter) private filtersRepository: Repository<Filter>,
    @InjectRepository(OrderByField) private readonly orderByRepository: Repository<OrderByField>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  async createFilter(data: FilterInput): Promise<Filter> {
    const filter = this.filtersRepository.create({ ...data, orderBy: [data.orderBy] });
    return await this.filtersRepository.save(filter);
  }

  async deleteFilter(ID: number) {
    return await this.filtersRepository.delete({ ID });
  }

  async getAllFilters() {
    return await this.filtersRepository.find();
  }

  async getFilterByID(ID: number) {
    const filter = await this.filtersRepository.findOne({ where: { ID } });
    if (!filter) {
      throw new NotFoundException(`Фильтр с ID ${ID} не найден`);
    }
    return filter;
  }

  // builderCondition(condition: FilterInput) {
  //   const queryBuilder = this.filtersRepository.createQueryBuilder("filter");
  //   condition.logicalOperator === LogicalOperator.AND ?
  //     queryBuilder.andWhere()
  //   queryBuilder.addOrderBy(condition.orderBy.field, condition.orderBy.orderBy)
  // }

  async filterIssue(filter: FilterInput) {
    const qb = this.filtersRepository.createQueryBuilder("filter");

    // Начинаем обработку условий из filter.conditions
    const finalQb = this.processConditions(qb, filter.conditions, filter.logicalOperator);

    // Добавляем остальные фильтры
    // if (filter.ID) {
    //   finalQb.andWhere("filter.id = :id", { id: filter.ID });
    // }
    if (filter.owner) {
      finalQb.andWhere("filter.ownerId = :ownerId", { ownerId: filter.owner });
    }
    if (filter.board) {
      finalQb.andWhere("filter.boardId = :boardId", { boardId: filter.board });
    }

    // Порядок сортировки
    if (filter.orderBy.orderBy === SortOrder.ASC) {
      qb.addOrderBy("filter.someField", "ASC");
    } else {
      qb.addOrderBy("filter.someField", "DESC");
    }

    console.log(qb.getSql());

    // Выполняем запрос
    const results = await qb.getMany();
  }

  processConditions(
    qb: WhereExpressionBuilder,
    conditions: ConditionGroup[] | ConditionItem[],
    logicalOperator: LogicalOperator
  ): WhereExpressionBuilder {
    let currentQb = qb;
    let firstCondition = true;

    for (const condition of conditions) {
      if (this.isConditionGroup(condition)) {
        console.log(condition);

        // Группа условий
        const bracket = new Brackets((qbInner) => {
          // qbInner — это WhereExpressionBuilder
          this.processConditions(qbInner, condition.conditions, condition.logicalOperator);
        });


        if (firstCondition) {
          currentQb = currentQb.where(bracket);
          console.log(bracket);
          firstCondition = false;
        } else {
          if (condition.logicalOperator === LogicalOperator.AND) {
            currentQb = currentQb.andWhere(bracket);
          } else {
            currentQb = currentQb.orWhere(bracket);
          }
        }
      } else {
        console.log(condition);

        // Простое условие
        const conditionClause = this.buildConditionClause(condition); // Ваша функция для формулировки условия
        if (firstCondition) {
          currentQb = currentQb.where(conditionClause.sql, conditionClause.parameters);
          firstCondition = false;
        } else {
          if (logicalOperator === LogicalOperator.AND) {
            currentQb = currentQb.andWhere(conditionClause.sql, conditionClause.parameters);
          } else {
            currentQb = currentQb.orWhere(conditionClause.sql, conditionClause.parameters);
          }
        }
      }
    }

    return currentQb;
  }

  applyCondition(
    qb: SelectQueryBuilder<any>,
    condition: any
  ): SelectQueryBuilder<any> {
    const { field, operator, value } = condition;

    // Обработка операторов
    switch (operator) {
      case Operator.EQUALS:
        return qb.andWhere(`filter.${field} = :value`, { value: value.ID });
      case Operator.IS_NOT_NULL:
        return qb.andWhere(`filter.${field} IS NOT NULL`);
      // добавьте другие операторы по необходимости
      case FunctionCall.UNRELEASED_VERSION:
        // пример вызова функции или подзапроса
        return qb.andWhere(`filter.${field} = (SELECT ... )`);
      // Добавьте остальные случаи
      default:
        return qb;
    }
  }
  buildConditionClause(condition: ConditionItem): { sql: string; parameters: any } {
    const { field, operator, valueInputID, valueInputIDArray, valueNumber, functionCall, valueString } = condition;
    const value = [valueInputID, valueInputIDArray, valueNumber, functionCall, valueString].find(item => item)
    switch (operator) {
      case Operator.EQUALS:
        return {
          sql: `filter.${field} = :value`,
          parameters: { value: value }
        };
      case Operator.IS_NOT_NULL:
        return {
          sql: `filter.${field} IS NOT NULL`,
          parameters: {}
        };
      case Operator.EQUALS:
        return {
          sql: `filter.${field} = :value`,
          parameters: { value: value }
        };
      // Добавьте другие операторы по необходимости
      case Operator.GREATER_THAN:
        return {
          sql: `filter.${field} > :value`,
          parameters: { value: value }
        };
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }

  isConditionGroup(obj: unknown): obj is ConditionGroup {
    return typeof obj === 'object' && obj !== null && 'conditions' in obj
  }
}
