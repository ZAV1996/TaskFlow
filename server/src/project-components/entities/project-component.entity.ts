import { Issue } from "src/issues/entities/issue.entity";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectComponent {

  @PrimaryGeneratedColumn()
  ID: number

  @ManyToOne(() => Project, (project) => project.components, { nullable: false })
  parent: Project

  @Column({ nullable: false })
  title: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(() => User, (user) => user.components, { nullable: true, cascade: true, eager: true, onDelete: "CASCADE" })
  owner: User

  @ManyToOne(() => User, (user) => user.executeComponent, { nullable: true, cascade: true, eager: true, onDelete: "SET NULL" })
  defaultExecuter: User
}
