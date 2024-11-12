import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "../Order/order.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 80, unique: true, nullable: false })
    email: string;

    @Column({ length: 100, nullable: false }) // Longitud ajustada para la contraseña hasheada
    password: string;

    @Column("varchar", { length: 25, nullable: true })
    phone: string;

    @Column("varchar", { length: 50, nullable: true })
    country: string;

    @Column("varchar", { length: 80, nullable: true })
    address: string;

    @Column("varchar", { length: 50, nullable: true })
    city: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}


