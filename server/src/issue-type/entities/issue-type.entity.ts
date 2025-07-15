import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Issue } from "src/issues/entities/issue.entity";
import { Project } from "src/projects/entities/project.entity";
import { ProjectType } from "src/projects/types/project.type";
import { Workflow } from "src/workflow/entities/workflow.entity";
import { WorkflowType } from "src/workflow/types/common/workflow.type";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@ObjectType()
@Entity()
export class IssueTypeEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  ID: number

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string

  @Field(() => String, { nullable: true })
  @Column()
  icon_url: string

  @OneToMany(() => Issue, issue => issue.issueType, { onDelete: "CASCADE" })
  issue: Issue

  @Field(() => ProjectType, { nullable: true })
  @ManyToOne(() => Project, project => project.issueTypes, { onDelete: "SET NULL" })
  project: Project

  @Field(() => WorkflowType, { nullable: true })
  @ManyToOne(() => Workflow, wf => wf.issueType, { onDelete: "SET NULL", cascade: true })
  workflow: Workflow
}
