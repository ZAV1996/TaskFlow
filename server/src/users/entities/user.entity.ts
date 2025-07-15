import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Cond } from 'src/cond/entities/cond.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, Index, OneToOne, JoinColumn } from "typeorm"
import { Issue } from 'src/issues/entities/issue.entity';
import { ProjectComponent } from 'src/project-components/entities/project-component.entity';
import { Filter } from 'src/filter/entities/filter.entity';
import { Board } from 'src/board/entities/board.entity';
import { FileEntity } from 'src/file/entities/file.entity';
import { GraphQLScalarType, Kind } from 'graphql';
export const GqlDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: string) {
    return value
  },
  parseValue(value: string) {
    return new Date(value); // Преобразует строку в Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
@ObjectType()
@Unique("user", ["email"])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "Идернификатор пользователя" })
  ID: number

  @Index()
  @Column({ length: 50, nullable: false })
  @Field(() => String, { description: "Адрес электронной почты пользователя", nullable: true })
  email: string

  @Column({ type: "varchar", length: 50 })
  @Field(() => String, { description: "Имя пользователя", nullable: true })
  name: string

  @Column({ type: "varchar", length: 50 })
  @Field(() => String, { description: "Фамилия пользователя", nullable: true })
  surname: string

  @Column({ type: "varchar", length: 50 })
  @Field(() => String, { description: "Отчество пользователя", nullable: true })
  patronymic: string

  @Column({ type: "varchar", length: 250, nullable: true })
  @Field(() => String, { description: "Подразделение", nullable: true })
  department?: string

  @Column({ default: false, type: "boolean" })
  @Field(() => Boolean, { description: "Пользовательский статус", nullable: true })
  isActivated?: boolean

  @Field(() => FileEntity, { description: "Аватар пользователя", nullable: true, })
  @OneToOne(() => FileEntity, { cascade: true, nullable: true, onDelete: "CASCADE" })
  @JoinColumn()
  avatar?: FileEntity

  // @Field(() => [FileEntity], { description: "Изображения пользователя", nullable: true })
  // @OneToMany(() => FileEntity, image => { return image.uploadedBy && image.type === FileType.USER_PHOTO })
  // images: FileEntity[]

  @Column({ type: 'varchar' })
  password: string

  @CreateDateColumn()
  @Field(() => GqlDate, { description: "Дата регистрации пользователя", nullable: false })
  register_date: Date

  @UpdateDateColumn()
  @Field(() => GqlDate, { description: "Дата последнего обновления пользователя", nullable: true })
  updated_date?: Date

  @ManyToMany(() => Group, (group) => group.users, { onDelete: "CASCADE" })
  groups: Group[];

  @OneToMany(() => Project, (project) => project.ID, { onDelete: "SET NULL" })
  projects: Project[]

  @OneToMany(() => Cond, (cond) => cond.users, { onDelete: "SET NULL" }) //TODO
  cond: Cond[]

  @OneToMany(() => Issue, issue => issue.author, { onDelete: "SET NULL" }) //TODO
  issues: Issue[]

  @OneToMany(() => Issue, issue => issue.assignee, { onDelete: "SET NULL" })//TODO 
  assignee: Issue[]

  @OneToMany(() => ProjectComponent, component => component.owner, { onDelete: "SET NULL" })//TODO
  components: ProjectComponent[]

  @OneToMany(() => ProjectComponent, component => component.defaultExecuter, { onDelete: "SET NULL" })//TODO
  executeComponent: ProjectComponent[]

  @OneToMany(() => Filter, filter => filter.owner)
  filters: Filter[]

  @OneToMany(() => Board, board => board.Owner, { onDelete: "CASCADE" })
  boards: Board[]

}