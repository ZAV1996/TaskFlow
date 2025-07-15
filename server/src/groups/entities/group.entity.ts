import { User } from 'src/users/entities/user.entity';
import { Cond } from 'src/cond/entities/cond.entity';
import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Unique("group", ["group_name"])
@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  ID: number

  @Index()
  @Column({ type: "varchar", nullable: false })
  group_name: string

  @CreateDateColumn()
  create_date: Date

  @UpdateDateColumn()
  updated_date?: Date

  @Column({ type: "varchar", nullable: true, length: 500 })
  description: string

  @ManyToMany(() => User, (user) => user.groups, { eager: true, onDelete: "CASCADE" })
  @JoinTable({ name: "group_members" })
  users: User[];

  @ManyToMany(() => Cond, (cond) => cond.groups)
  conds: Cond[]
}