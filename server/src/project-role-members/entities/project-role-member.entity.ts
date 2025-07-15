import { UUID } from 'node:crypto';
import { ProjectRole } from 'src/project-role/entities/project-role.entity';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectRoleMember {
  @PrimaryGeneratedColumn()
  ID: number

  @ManyToOne(() => ProjectRole, role => role.members, { onDelete: "CASCADE" })
  role: ProjectRole

  @ManyToOne(() => Project, project => project.projectRoleMember, { onDelete: "CASCADE" })
  project: Project

  @JoinTable({ name: "project_role_member_user" })
  @ManyToMany(() => User, { eager: true })
  members: User[]
}
