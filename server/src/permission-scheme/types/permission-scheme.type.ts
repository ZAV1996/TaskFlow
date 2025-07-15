import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProjectType } from "src/projects/types/project.type";
import { InputID } from "src/workflow/inputs/create.input";

@ObjectType()
export class PermissionSchemeType {
    @Field(() => Int)
    ID: number;

    @Field(() => String)
    name: string

    @Field(() => String, { nullable: true })
    description: string

}
