import { ObjectType } from "@nestjs/graphql";
import { PermissionSchemeRule } from "src/permission-scheme-rules/entities/permission-scheme-rule.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class PermissionScheme {
  @PrimaryGeneratedColumn()
  ID: number;

  @Index()
  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @OneToMany(() => Project, project => project.permissionScheme, { onDelete: "SET NULL" })
  project: Project[]

  @OneToMany(() => PermissionSchemeRule, rule => rule.permissionScheme, { eager: true, onDelete: "SET NULL" })
  permissionSchemeRule: PermissionSchemeRule[]
}
