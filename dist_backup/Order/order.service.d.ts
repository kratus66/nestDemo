import { OrderRepository } from './order.repostitory';
import { Order } from './order.entity';
export declare class OrderService {
    private readonly orderRepository;
    constructor(orderRepository: OrderRepository);
    addOrder(userId: string, productIds: string[]): Promise<{
        id: string;
        totalAmount: number;
        orderDetailsId: string;
    }>;
    getOrder(orderId: string): Promise<Order | null>;
}
