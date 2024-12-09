import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "../Order/order.entity";
import { Role } from "../constants/roles.enum";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, nullable: false })
    name: string = '';

    @Column({ length: 50, unique: true, nullable: false })
    email: string = '';

    @Column({ length: 255, nullable: false })
    password: string = '';

    @Column("bigint", { nullable: true })
    phone?: number;


    @Column("varchar", { length: 50, nullable: true })
    country?: string;

    @Column("varchar", { length: 80, nullable: true })
    address?: string;

    @Column("varchar", { length: 50, nullable: true })
    city?: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role = Role.USER;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[] ;
}


