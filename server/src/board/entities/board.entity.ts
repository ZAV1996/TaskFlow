import { BoardColumn } from "src/column-board/entities/column-board.entity";
import { Filter } from "src/filter/entities/filter.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum board_type {
  sprint = "sprint",
  kanban = "kanban"
}

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  ID: number

  @Index()
  @Column({ type: "varchar" })
  board_name: string

  @Column({ type: "enum", name: "board_type", enum: board_type })
  board_type: board_type

  @ManyToOne(() => User, user => user.boards, { eager: true, onDelete: "SET NULL" })
  Owner: User

  @CreateDateColumn()
  create_date: Date

  @UpdateDateColumn()
  update_date: Date

  @ManyToOne(() => Filter, filter => filter.board, { eager: true, nullable: true, onDelete: "SET NULL" })
  filter: Filter

  @OneToMany(() => BoardColumn, column => column.board, { nullable: true, eager: true, onDelete: 'CASCADE' })
  columns: BoardColumn[]
}
