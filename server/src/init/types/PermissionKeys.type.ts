import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PermissionSchemeRule } from "src/permission-scheme-rules/entities/permission-scheme-rule.entity";
import { PermissionSchemeRuleType } from "src/permission-scheme-rules/types/permission-scheme-rule.type";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@ObjectType()
export class PermissionKeyType {
    @Field(() => Int)
    ID: number;

    @Field(() => String)
    permissionName: string

    @Field(() => String)
    permissionKey: string

    @Field(() => String)
    description: string

    @Field(() => [PermissionSchemeRuleType])
    permissionSchemeRule: PermissionSchemeRuleType[]
}
