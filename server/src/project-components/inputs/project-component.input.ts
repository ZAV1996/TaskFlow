import { Field, InputType, Int } from "@nestjs/graphql"
import { InputUser } from "src/cond/inputs/user_cond.input"
import { InputID } from "src/workflow/inputs/create.input"

@InputType()
export class ProjectComponent {

    @Field(() => Int)
    ID: number

    @Field(() => InputID)
    parent: InputID

    @Field(() => String)
    title: string

    @Field(() => String)
    description: string

    @Field(() => InputUser)
    owner: InputUser

    @Field(() => InputUser)
    defaultExecuter: InputUser

    @Field(() => [InputID])
    issues: InputID[]
}