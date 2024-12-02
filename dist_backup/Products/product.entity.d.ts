import { Category } from "../Category/category.entity";
import { OrderDetails } from "../Order/orderDetails.entity";
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: Category;
    orderDetails?: OrderDetails[];
}
