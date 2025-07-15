import { Field, InputType } from "@nestjs/graphql";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class GetPermissionRulesBySchemeID {
    @Field(() => InputID, { description: "ID scheme" })
    ID: InputID

    @Field(() => InputID, { description: "ID project" })
    projectID: InputID

}