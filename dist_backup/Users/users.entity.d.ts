import { Order } from "../Order/order.entity";
import { Roles } from "src/constants/roles.enum";
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    role: Roles;
    orders: Order[];
}
