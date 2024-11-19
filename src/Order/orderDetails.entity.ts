import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../Products/product.entity";

@Entity({ name: "order_details" })
export class OrderDetails {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    // Relación 1:1 con Order
    @OneToOne(() => Order, (order) => order.orderDetails, { nullable: false })
    @JoinColumn({ name: "order_id" })
    order: Order;

    // Relación N:N con Product
    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable({
        name: "order_details_products", // Nombre de la tabla intermedia
        joinColumn: { name: "order_details_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
    })
    products: Product[];
}

