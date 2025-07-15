import { Board } from 'src/board/entities/board.entity';
import { Status } from 'src/status/entities/status.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn()
  ID: number;

  @Index()
  @Column()
  column_name: string;

  @ManyToMany(() => Status, status => status.columns, { onDelete: "CASCADE", eager: true })
  @JoinTable({ name: "column_status" })
  statuses: Status[];

  @ManyToOne(() => Board, board => board.columns, { onDelete: "CASCADE" })
  board: Board

  @Index()
  @Column()
  column_position: number;
}