import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "../Users/users.entity";
import { OrderDetails } from "./orderDetails.entity";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order, { cascade: true })
    @JoinColumn({ name: "order_details_id" })
    orderDetails: OrderDetails;

    @Column("decimal", { precision: 10, scale: 2, nullable: false, default: 0 })
    totalAmount: number;
}


