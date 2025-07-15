import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Workflow } from "src/workflow/entities/workflow.entity";
import { Cond } from "src/cond/entities/cond.entity";
import { Issue } from "src/issues/entities/issue.entity";
import { BoardColumn } from "src/column-board/entities/column-board.entity";
import { Transition } from "src/transition/entities/transition.entity";
import { StatusMeta } from "./status.meta.entity";

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    ID?: number

    @ManyToOne(() => Workflow, (workflow) => workflow.statuses, { onDelete: 'CASCADE' })
    parent?: Workflow

    @Index()
    @Column()
    title: string

    @OneToOne(() => Cond, { cascade: true, eager: true, nullable: true })
    @JoinColumn()
    cond?: Cond

    @OneToMany(() => Transition, transition => transition.parent, { cascade: true, lazy: true, onDelete: "CASCADE" })
    transitions: Transition[];

    @Column({ nullable: false, default: false })
    is_initial: boolean

    @Column({ nullable: false, default: false })
    on_process: boolean

    @Column({ nullable: false, default: false })
    is_finished: boolean

    @OneToMany(() => Issue, issue => issue.status, { nullable: true })
    Issues?: Issue[]

    @ManyToMany(() => BoardColumn, column => column.statuses)
    columns: BoardColumn[]

    @OneToOne(() => StatusMeta, { cascade: true, eager: true })
    @JoinColumn()
    status_meta: StatusMeta
}