import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../Products/product.entity";

@Entity("order_details") // 🔹 Define el nombre explícito de la tabla
export class OrderDetails {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: "int", nullable: false }) // 🔹 Asegurar que `quantity` está bien definido
    quantity: number;

    @Column({ type: "varchar", length: 50, default: "Pendiente" })
    status: string;

    @ManyToOne(() => Order, (order) => order.orderDetails, { onDelete: "CASCADE" })
    order: Order;

    @ManyToMany(() => Product, (product) => product.orderDetails, { cascade: true })
    @JoinTable()
    products: Product[];
}

