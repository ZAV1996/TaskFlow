import { UUID } from "node:crypto";
import { ProjectRoleMember } from "src/project-role-members/entities/project-role-member.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectRole {
  @PrimaryGeneratedColumn()
  ID: number

  @Index()
  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @OneToMany(() => ProjectRoleMember, member => member.role, { eager: true, onDelete: "CASCADE" })
  members: ProjectRoleMember[]
}
