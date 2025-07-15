import { Field, InputType, Int } from "@nestjs/graphql";
import { createZodDto } from "nestjs-zod";
import { PermissionSchemeRuleInputScheme } from "./permission-scheme-rule.input";
import { InputID } from "src/workflow/inputs/create.input";
import { PermissionSchemeKeys } from "../entities/permission-scheme-rule.entity";

@InputType()
export class UpdatePermissionSchemeRuleInput extends createZodDto(PermissionSchemeRuleInputScheme.omit({ permissionKey: true, permissionScheme: true })) {
    @Field(() => Int)
    ID: number

    @Field(() => [InputID], { nullable: true })
    user: InputID[]

    @Field(() => [InputID], { nullable: true })
    group: InputID[];

    @Field(() => [InputID], { nullable: true })
    projectRole: InputID[];

    @Field(() => Boolean, { nullable: true })
    is_Project_Lead: boolean

    @Field(() => Boolean, { nullable: true })
    is_Assegnee: boolean

    @Field(() => Boolean, { nullable: true })
    is_Owner: boolean
}