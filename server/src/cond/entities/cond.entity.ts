import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { GroupType } from "src/groups/types/group.type";

@Entity()
export class Cond {
    @PrimaryGeneratedColumn()
    ID: number

    @ManyToMany(() => Group, (group) => group.ID, { cascade: true, eager: true, nullable: true })
    @JoinTable({ name: "conds_groups" })
    groups?: GroupType[]

    @ManyToMany(() => User, (user) => user.ID, { cascade: true, eager: true })
    @JoinTable({ name: "conds_users" })
    users?: User[]

    @Column({ type: "boolean", nullable: false, default: true })
    author?: boolean

    @Column({ type: "boolean", nullable: false, default: true })
    asignee?: boolean
}