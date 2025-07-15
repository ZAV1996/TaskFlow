import { ObjectType } from "@nestjs/graphql";
import { PermissionSchemeRule } from "src/permission-scheme-rules/entities/permission-scheme-rule.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class PermissionKey {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    permissionName: string

    @Column()
    permissionKey: string

    @Column({ nullable: true })
    description: string

    @OneToMany(() => PermissionSchemeRule, rule => rule.permissionKey)
    permissionSchemeRule: PermissionSchemeRule[]
}
