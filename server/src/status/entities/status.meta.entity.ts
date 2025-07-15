import { registerEnumType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum StatusStyleVariant {
    DEFAULT = "default",
    WARNING = 'warning',
    SUCCESS = 'success',
    PRIMARY = 'primary'
};

registerEnumType(StatusStyleVariant, {
    name: 'StatusStyleVariant'
})

@Entity()
export class StatusMeta {
    @PrimaryGeneratedColumn()
    ID: number

    @Column({ nullable: false, default: 0 })
    posX: number

    @Column({ nullable: false, default: 0 })
    posY: number

    @Column({ type: 'enum', enum: StatusStyleVariant, nullable: false, default: StatusStyleVariant.DEFAULT })
    variant: StatusStyleVariant
}