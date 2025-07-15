import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
import { PermissionSchemeRuleInput, PermissionSchemeRuleInputScheme } from "./permission-scheme-rule.input";
import { createZodDto } from "nestjs-zod";
import { InputID } from "src/workflow/inputs/create.input";
import { PermissionSchemeKeys } from "../entities/permission-scheme-rule.entity";

@InputType()
export class CreatePermissionSchemeRuleInput extends createZodDto(PermissionSchemeRuleInputScheme.omit({ ID: true })) {
    @Field(() => InputID)
    permissionScheme: InputID

    @Field(() => PermissionSchemeKeys, { nullable: false })
    permissionKey: PermissionSchemeKeys

    @Field(() => [InputID])
    user: InputID[]

    @Field(() => [InputID])
    group: InputID[];

    @Field(() => [InputID])
    projectRole: InputID[];

    @Field(() => Boolean)
    is_Project_Lead: boolean

    @Field(() => Boolean)
    is_Assegnee: boolean

    @Field(() => Boolean)
    is_Owner: boolean
}