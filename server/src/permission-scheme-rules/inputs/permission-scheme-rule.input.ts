import { Field, InputType, Int } from "@nestjs/graphql";
import { InputID, InputIDSchema } from "src/workflow/inputs/create.input";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { PermissionSchemeKeys } from "../entities/permission-scheme-rule.entity";
import z, { nullable } from 'zod'
import { createZodDto } from "nestjs-zod";
const PermissionKeyEnumValues = Object.values(PermissionSchemeKeys) as Array<PermissionSchemeKeys>;

export const PermissionSchemeRuleInputScheme = z.object({
    ID: z.number(),
    permissionScheme: InputIDSchema.optional(),
    permissionKey: z.enum(PermissionKeyEnumValues as [PermissionSchemeKeys, ...PermissionSchemeKeys[]]).optional(),
    user: z.array(InputIDSchema).optional(),
    group: z.array(InputIDSchema).optional(),
    projectRole: z.array(InputIDSchema).optional(),
    is_Project_Lead: z.boolean().optional(),
    is_Assegnee: z.boolean().optional(),
    is_Owner: z.boolean().optional()
})
@InputType()
export class PermissionSchemeRuleInput extends createZodDto(PermissionSchemeRuleInputScheme) {
    @Field(() => Int)
    ID: number

    @Field(() => InputID, { nullable: true })
    permissionScheme?: InputID

    @Field(() => PermissionSchemeKeys, { nullable: true })
    permissionKey?: PermissionSchemeKeys

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