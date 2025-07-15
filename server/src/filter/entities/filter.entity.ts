import { Board } from 'src/board/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { FieldType, LogicalOperator, SortOrder } from '../inputs/filter.input';
import { OrderByField } from './orderBy.entity';

@Entity()
export class Filter {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  title: string;

  @Column('json')
  conditions: any;

  @Column({ nullable: true, enum: LogicalOperator, type: 'enum' })
  logicalOperator: LogicalOperator;

  @ManyToOne(() => User, user => user.filters, { eager: true })
  owner: User

  @OneToMany(() => Board, board => board.filter, { onDelete: "SET NULL" })
  board: Board

  @OneToMany(() => OrderByField, orderBy => orderBy.filter, { cascade: true, onDelete: 'CASCADE' })
  // @JoinColumn()
  orderBy?: OrderByField[]
}

