import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FileType, MimeType, RelatedEntityType } from '../input/upload-file.input';

registerEnumType(RelatedEntityType, {
  name: 'RelatedEntityType'
})
registerEnumType(FileType, {
  name: 'FileType'
})

registerEnumType(MimeType, {
  name: 'MimeType'
})

@ObjectType()
@Entity('files')
export class FileEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  ID: number;

  @Field(() => String, { nullable: true })
  @Column()
  originalName: string; // Имя файла при загрузке

  @Field(() => String, { nullable: true })
  @Column()
  filename: string; //Уникальное имя файла на сервере uuid

  @Field(() => MimeType, { nullable: true })
  @Column({ type: "enum", enum: MimeType })
  mimetype: MimeType; // MIME-тип файла

  @Field(() => Int, { nullable: true })
  @Column()
  size: number; //Размер файла в байтах

  @Field(() => String, { nullable: true })
  @Column()
  path: string; // Путь до файла на сервере

  @Field(() => String)
  @Column()
  url: string; // адрес файла на сайте

  @Field(() => String, { nullable: true })
  @Column({ type: 'enum', enum: FileType })
  type: FileType; // Предназначение файла

  @Field(() => RelatedEntityType, { nullable: true })
  @Column({ type: 'enum', enum: RelatedEntityType, nullable: true })
  relatedEntityType?: RelatedEntityType; // Отношение с сущности файла

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  relatedEntityId?: number; //ID этой сущности

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
  uploadedBy?: User; // Пользователь загрузивший этот файл

  @Field(() => Date, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;
}
