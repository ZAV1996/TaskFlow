import { Cond } from "src/cond/entities/cond.entity";
import { IssueLink } from "src/issue-link/entities/issue-link.entity";
import { IssueTypeEntity } from "src/issue-type/entities/issue-type.entity";
import { ProjectComponent } from "src/project-components/entities/project-component.entity";
import { Project } from "src/projects/entities/project.entity";
import { Status } from "src/status/entities/status.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  ID: number

  @ManyToOne(() => Project, project => project.issues, { onDelete: "CASCADE", })
  project: Project

  @Column({ length: 10 })
  key: string;

  @Index()
  @Column()
  issueNum: number

  @ManyToOne(() => IssueTypeEntity, type => type.issue, { onDelete: 'SET NULL' })
  @JoinColumn()
  issueType: IssueTypeEntity

  @ManyToOne(() => User, user => user.assignee, {
    nullable: true,
    eager: true,
    onDelete: "SET NULL"
  })
  assignee?: User

  @ManyToOne(() => User, user => user.issues, {
    eager: true,
    onDelete: "SET NULL"
  })
  author: User

  @Index()
  @Column()
  title: string

  @Column({ nullable: true })
  description?: string

  @ManyToMany(() => ProjectComponent, component => component.ID, {
    nullable: true,
    eager: true
  })
  @JoinTable({ name: "issues_components" })
  components?: ProjectComponent[]

  //TODO
  @Column({ default: "Средний" })
  priority: "Высокий" | "Средний" | "Низкий"

  @ManyToOne(() => Status, status => status.Issues, { eager: true })
  status: Status

  @ManyToOne(() => Issue, issue => issue.childrenIssues, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  parentIssue: Issue

  @OneToMany(() => Issue, issue => issue.parentIssue, {
    nullable: true,
    lazy: true,
    cascade: true
  })
  childrenIssues: Issue[]

  @CreateDateColumn()
  create_date: Date

  @UpdateDateColumn()
  update_date?: Date

  @Column({ type: 'datetime', nullable: true })
  due_date: Date

  // Обратная связь: Эта задача является источником для многих IssueLink
  @OneToMany(() => IssueLink, issueLink => issueLink.source_issue)
  sourceIssueLinks: IssueLink[];

  // Обратная связь: Эта задача является целью для многих IssueLink
  @OneToMany(() => IssueLink, issueLink => issueLink.target_issue)
  targetIssueLinks: IssueLink[];

}
