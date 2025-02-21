import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Category } from "../Category/category.entity";
import { OrderDetails } from "../Order/orderDetails.entity";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string ;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string = '';

    @Column("text", { nullable: false })
    description: string = '';

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number = 0;

    @Column("int", { nullable: false })
    stock: number = 0;

    @Column({ default: "default-image.jpg" })
    imgUrl: string = 'default-image.jpg';

  

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products, { nullable: true })
    orderDetails?: OrderDetails[];
}
