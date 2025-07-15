import { Field, InputType, OmitType } from "@nestjs/graphql";
import { ProjectRoleMemberInput, ProjectRoleMemberInputScheme } from "./project-role-member.input";
import { createZodDto } from "nestjs-zod";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class AddMemberInRoleInput extends createZodDto(ProjectRoleMemberInputScheme.omit({ ID: true })) {
    @Field(() => [InputID])
    members: InputID[]

    @Field(() => InputID)
    project: InputID

    @Field(() => InputID)
    role: InputID
}