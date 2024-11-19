import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Product } from "../Products/product.entity";

@Entity({ name: "order_details" })
export class OrderDetails {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable({
        name: "order_details_products",
        joinColumn: { name: "order_details_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
    })
    products: Product[];
}

