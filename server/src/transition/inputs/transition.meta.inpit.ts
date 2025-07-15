import { Field, InputType, Int } from '@nestjs/graphql'
import { HandleTypeID } from '../entities/transition.meta.entity'

@InputType()
export class TransitionMetaInput {
    @Field(() => HandleTypeID)
    sourceHandle: HandleTypeID

    @Field(() => HandleTypeID)
    targetHandle: HandleTypeID
}