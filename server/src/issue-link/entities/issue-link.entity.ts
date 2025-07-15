import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Issue } from 'src/issues/entities/issue.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
export enum LinkType {
  FS = 'FINISH_START',
  SS = 'START_START',
  FF = 'FINISH_FINISH',
  SF = 'START_FINISH'
}
@Entity()
export class IssueLink {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'enum', enum: LinkType })
  link_type: LinkType;

  // Связь Many-to-One: Одна IssueLink ссылается на одну исходную Issue
  @ManyToOne(() => Issue, issue => issue.sourceIssueLinks, { onDelete: "SET NULL" }) // issue.sourceIssueLinks - это обратная связь в Issue
  source_issue: Issue;

  // Связь Many-to-One: Одна IssueLink ссылается на одну целевую Issue
  @ManyToOne(() => Issue, issue => issue.targetIssueLinks, { onDelete: "SET NULL" }) // issue.targetIssueLinks - это обратная связь в Issue
  target_issue: Issue;
}
