import { User } from "../Users/users.entity";
import { OrderDetails } from "./orderDetails.entity";
export declare class Order {
    id: string;
    user: User;
    date: Date;
    orderDetails: OrderDetails;
    totalAmount: number;
}
