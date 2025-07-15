import { InputType, OmitType } from "@nestjs/graphql";
import { PermissionSchemeInput } from "./permission-scheme.input";

@InputType()
export class CreatePermissionSchemeInput extends OmitType(PermissionSchemeInput, ["ID", "permissionSchemeRule", "project"]) { }