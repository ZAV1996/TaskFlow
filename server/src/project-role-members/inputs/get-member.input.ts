import { Field, InputType, OmitType } from "@nestjs/graphql";
import { ProjectRoleMemberInput, ProjectRoleMemberInputScheme } from "./project-role-member.input";
import { createZodDto } from "nestjs-zod";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class GetProjectRoleMemberInput extends createZodDto(ProjectRoleMemberInputScheme.omit({ ID: true, members: true })) {
    @Field(() => InputID)
    project: InputID

    @Field(() => InputID)
    role: InputID
}