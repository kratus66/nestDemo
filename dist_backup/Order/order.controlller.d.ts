import { OrderService } from './order.service';
import { Response } from 'express';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    addOrder(orderData: {
        userId: string;
        products: {
            id: string;
        }[];
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrder(orderId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
