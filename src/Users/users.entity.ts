import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "../Order/order.entity";
import { Role } from "./constants/roles.enum"; // Importamos correctamente el enum

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    @Column({ length: 80, nullable: false })
    password: string;

    @Column("integer", { nullable: true })
    phone?: number;

    @Column("text", { nullable: true })
    address?: string;

    @Column("varchar", { length: 50, nullable: true })
    country?: string;

    @Column("varchar", { length: 50, nullable: true })
    city?: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER,
    })
    role: Role; // ✅ Asegurar que el tipo es Role y no un string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}





