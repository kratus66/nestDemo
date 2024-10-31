import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "../Users/users.entity";
import { OrderDetails } from "./orderDetails.entity";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @OneToOne(() => OrderDetails, { cascade: true })
    @JoinColumn()
    orderDetails: OrderDetails;

    @Column("decimal", { precision: 10, scale: 2, nullable: false, default: 0 })
    totalAmount: number; // Almacena el monto total de la orden
}
