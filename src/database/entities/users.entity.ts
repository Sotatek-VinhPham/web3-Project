import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    userId : string

    @Column()
    email : string
}