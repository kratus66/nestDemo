import { Order } from "src/Order/order.entity";
export declare class CreateOrderDto {
    userId: string;
    products: Partial<Order>[];
}
