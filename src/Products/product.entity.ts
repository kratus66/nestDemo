import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Category } from "../Category/category.entity";
import { OrderDetails } from "../Order/orderDetails.entity";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column("text", { nullable: false })
    description: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column("int", { nullable: false })
    stock: number;

    @Column({ default: "default-image.jpg" })
    imgUrl: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products, { nullable: true })
    orderDetails?: OrderDetails[];
}
