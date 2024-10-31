import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../Products/product.entity";

@Entity({ name: "order_details" })
export class OrderDetails {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Order, (order) => order.orderDetails)
    order: Order;

    @ManyToMany(() => Product, (product) => product.orderDetails)
    products: Product[];
}
