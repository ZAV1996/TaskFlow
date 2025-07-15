import { Field, InputType, Int } from "@nestjs/graphql"
import { InputUser } from "src/cond/inputs/user_cond.input"
import { InputID } from "src/workflow/inputs/create.input"

@InputType()
export class CreateProjectComponentInput {
    @Field(() => InputID, { nullable: false })
    parent: InputID

    @Field(() => String, { nullable: false })
    title: string

    @Field(() => String, { nullable: true })
    description: string

    @Field(() => InputID, { nullable: true })
    owner: InputID

    @Field(() => InputID, { nullable: true })
    defaultExecuter: InputID
    
    @Field(() => [InputID], { nullable: true })
    issues: InputID[]
}