import { Field, InputType, Int, OmitType, PartialType } from "@nestjs/graphql";
import { PermissionSchemeRuleInput } from "src/permission-scheme-rules/inputs/permission-scheme-rule.input";

@InputType()
export class TransitionPermissionSchemeRuleInput extends PartialType(OmitType(PermissionSchemeRuleInput, ['permissionKey', 'permissionScheme', 'ID'])) {
    @Field(() => Int, { description: "Идентификатор перехода" })
    ID: number
}