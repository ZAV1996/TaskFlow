import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, JoinColumn } from "typeorm";


@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn({ comment: "Уникальный ID лога" })
  ID: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column()
  handlerName: string

  @Column({ nullable: true })
  argument?: string

  @Column({ nullable: true })
  ipAddress: string;

  @CreateDateColumn()
  timestamp: Date;
}