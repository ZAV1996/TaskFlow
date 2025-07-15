import { Project } from 'src/projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Risk {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.risk, { eager: true, cascade: ['insert'] })
  Project: Project

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  probability: number; // 0-1

  @Column()
  impact: number; // 1-5

  @Column()
  mitigationPlan: string;

  @Column({ default: 'open' })
  status: string; // open, mitigated, realized
}
