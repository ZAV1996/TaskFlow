import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PermissionSchemeRuleType } from 'src/permission-scheme-rules/types/permission-scheme-rule.type'
import { StatusType } from 'src/status/types/status.type'
import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TransitionMeta } from '../entities/transition.meta.entity'


@ObjectType()
export class TransitionType {
    @Field(() => Int, { nullable: true })
    ID: number

    @Field(() => String, { nullable: true })
    title: string

    @Field(() => StatusType, { nullable: true })
    to?: StatusType

    @Field(() => StatusType, { nullable: true })
    parent?: StatusType

    @Field(() => PermissionSchemeRuleType, { nullable: true })
    permission?: PermissionSchemeRuleType

    @Field(() => TransitionMeta)
    transition_meta: TransitionMeta
}
