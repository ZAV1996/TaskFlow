import { Field, InputType, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { InputID } from "src/workflow/inputs/create.input";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { PermissionSchemeKeys } from "../entities/permission-scheme-rule.entity";
import { PermissionSchemeType } from "src/permission-scheme/types/permission-scheme.type";
import { User } from "src/users/entities/user.entity";
import { GroupType } from "src/groups/types/group.type";
import { ProjectRole } from "src/project-role/entities/project-role.entity";
import { ProjectRoleType } from "src/project-role/types/project-role.type";
import { PermissionKeyType } from "src/init/types/PermissionKeys.type";

registerEnumType(PermissionSchemeKeys, { name: "PermissionSchemeKeys" })

@ObjectType()
export class PermissionSchemeRuleType {
    @Field(() => Int)
    ID: number

    @Field(() => PermissionSchemeType)
    permissionScheme: PermissionSchemeType

    @Field(() => PermissionKeyType)
    permissionKey: PermissionKeyType

    @Field(() => [User], { nullable: true })
    user: User[]

    @Field(() => [GroupType], { nullable: true })
    group: GroupType[];

    @Field(() => [ProjectRoleType], { nullable: true })
    projectRole: ProjectRoleType[];

    @Field(() => Boolean, { nullable: true })
    is_Project_Lead: boolean

    @Field(() => Boolean, { nullable: true })
    is_Assegnee: boolean

    @Field(() => Boolean, { nullable: true })
    is_Owner: boolean
}