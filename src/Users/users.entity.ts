import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "../Order/order.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    @Column({ length: 20, nullable: false })
    password: string;

    @Column("bigint", { nullable: true })
    phone: number;

    @Column({ length: 50, nullable: true })
    country: string;

    @Column("text", { nullable: true })
    address: string;

    @Column({ length: 50, nullable: true })
    city: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}
