import { Cond } from 'src/cond/entities/cond.entity'
import { PermissionSchemeRule } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity'
import { Status } from 'src/status/entities/status.entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TransitionMeta } from './transition.meta.entity'

@Entity()
export class Transition {
  @PrimaryGeneratedColumn()
  ID: number

  @Index()
  @Column({ nullable: true })
  title: string

  @ManyToOne(() => Status, status => status.transitions, { onDelete: "CASCADE" })
  parent: Status

  @ManyToOne(() => Status, status => status.ID, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  to?: Status

  @OneToOne(() => PermissionSchemeRule, { cascade: true, eager: true, onDelete: 'SET NULL' })
  @JoinColumn()
  permission?: PermissionSchemeRule

  @OneToOne(() => TransitionMeta, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  transition_meta: TransitionMeta
}