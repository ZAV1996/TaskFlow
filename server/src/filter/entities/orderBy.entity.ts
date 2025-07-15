import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Filter } from "./filter.entity";
import { FieldType, SortOrder } from "../inputs/filter.input";

@Entity()
export class OrderByField {
    @PrimaryGeneratedColumn()
    ID: number;

    @ManyToOne(() => Filter, filter => filter.orderBy, { onDelete: 'CASCADE' })
    filter: Filter

    @Column({ type: 'enum', enum: FieldType })
    field: FieldType

    @Column({ type: 'enum', enum: SortOrder })
    orderBy: SortOrder;
}