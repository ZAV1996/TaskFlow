import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
/** 
 * Типы хендлов ReactFlow: Source (выход) / Target (вход) + позиция.  
 * Пример: SB = Source Bottom, TL = Target Left.  
 */
export enum HandleTypeID {
    SB = 'sb',
    SR = 'sr',
    ST = 'st',
    TL = 'tl',
    TT = 'tt',
    TB = 'tb'
}
registerEnumType(HandleTypeID, {
    name: "HandleTypeID"
})

@ObjectType()
@Entity()
export class TransitionMeta {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    ID: number

    @Field(() => HandleTypeID)
    @Column({ type: 'enum', enum: HandleTypeID })
    sourceHandle: HandleTypeID

    @Field(() => HandleTypeID)
    @Column({ type: 'enum', enum: HandleTypeID })
    targetHandle: HandleTypeID
}