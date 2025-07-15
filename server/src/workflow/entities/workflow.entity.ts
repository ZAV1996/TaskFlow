import { IssueTypeEntity } from 'src/issue-type/entities/issue-type.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Status } from 'src/status/entities/status.entity';
import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn, } from 'typeorm';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  ID!: number;

  @OneToMany(() => IssueTypeEntity, type => type.workflow, { onDelete: 'SET NULL' })
  issueType?: IssueTypeEntity[]


  @Index()
  @Column({ type: "varchar", length: 200, nullable: false })
  title: string

  @OneToMany(() => Status, (status) => status.parent, { cascade: true, nullable: true, onDelete: "CASCADE" })
  statuses: Status[]

  @Column({ nullable: true })
  description: string

  @CreateDateColumn()
  create_date: Date

  @UpdateDateColumn()
  update_date?: Date
}
