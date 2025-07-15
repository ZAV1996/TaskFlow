import { Field, InputType, Int } from "@nestjs/graphql";
import { InputID, InputIDSchema } from "src/workflow/inputs/create.input";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import z from 'zod'
import { createZodDto } from "nestjs-zod"
const PermissionSchemeInputScheme = z.object({
    ID: z.number(),
    Name: z.string().trim().nonempty(),
    Description: z.string().trim().optional(),
    project: InputIDSchema,
    PermissionSchemeRule: z.array(InputIDSchema)
})
@InputType()
export class PermissionSchemeInput {
    @Field(() => Int)
    ID: number;

    @Field(() => String)
    name: string

    @Field(() => String, { nullable: true })
    description: string

    @Field(() => InputID)
    project: InputID

    @Field(() => [InputID])
    permissionSchemeRule: InputID[]
}