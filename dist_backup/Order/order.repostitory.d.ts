import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../Users/users.entity';
import { Product } from '../Products/product.entity';
import { OrderDetails } from './orderDetails.entity';
export declare class OrderRepository {
    private readonly orderRepo;
    private readonly userRepo;
    private readonly productRepo;
    private readonly orderDetailsRepo;
    constructor(orderRepo: Repository<Order>, userRepo: Repository<User>, productRepo: Repository<Product>, orderDetailsRepo: Repository<OrderDetails>);
    createOrder(userId: string, productIds: string[]): Promise<Order>;
    findOrderById(orderId: string): Promise<Order | null>;
}
