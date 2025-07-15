import { Board } from 'src/board/entities/board.entity';
import { Cond } from 'src/cond/entities/cond.entity';
import { FileEntity } from 'src/file/entities/file.entity';
import { IssueTypeEntity } from 'src/issue-type/entities/issue-type.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { PermissionScheme } from 'src/permission-scheme/entities/permission-scheme.entity';
import { ProjectComponent } from 'src/project-components/entities/project-component.entity';
import { ProjectRoleMember } from 'src/project-role-members/entities/project-role-member.entity';
import { ProjectRole } from 'src/project-role/entities/project-role.entity';
import { Risk } from 'src/risk/entities/risk.entity';
import { User } from 'src/users/entities/user.entity';
import { Workflow } from 'src/workflow/entities/workflow.entity';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique, Index, JoinTable, OneToOne, ManyToMany, OneToMany, JoinColumn } from "typeorm"

@Unique("project", ["key"])
@Entity()
export class Project {
  @PrimaryGeneratedColumn({ comment: "Идентификатор проекта" })
  ID: number;

  @Index()
  @Column({ comment: "Имя проекта" })
  project_name: string;

  @Column({ type: "varchar", length: 500, nullable: true, comment: "Описание проекта" })
  description: string;

  @ManyToOne(() => User, (user) => user.ID, { nullable: true, onDelete: "SET NULL" })
  lead: User

  @Index()
  @Column({ length: 10, nullable: false, comment: "Ключ проекта" })
  key: string

  @OneToOne(() => FileEntity, { cascade: true, nullable: true, onDelete: "SET NULL" })
  @JoinColumn()
  image?: FileEntity

  @CreateDateColumn({ comment: "Дата создания проекта" })
  create_date: Date

  @UpdateDateColumn({ comment: "Дата последнего обновления проекта" })
  update_date: Date

  @OneToMany(() => ProjectComponent, component => component.parent, { cascade: true, eager: true })
  components: ProjectComponent[]

  @OneToMany(() => IssueTypeEntity, type => type.project, { cascade: true, onDelete: 'SET NULL' })
  issueTypes: IssueTypeEntity[]

  @OneToMany(() => Issue, issue => issue.project, { nullable: true, onDelete: 'CASCADE', cascade: true })//, eager: true 
  issues: Issue[]

  @OneToMany(() => Risk, risk => risk.Project)
  risk: Risk[]

  @ManyToOne(() => PermissionScheme, permission => permission.project, { onDelete: "SET NULL" })
  permissionScheme: PermissionScheme

  @OneToMany(() => ProjectRoleMember, member => member.project, { onDelete: "CASCADE" })
  projectRoleMember: ProjectRoleMember
}
