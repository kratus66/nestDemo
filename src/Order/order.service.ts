import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repostitory';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async addOrder(userId: string, productIds: string[]): Promise<{ id: string; totalAmount: number; orderDetailsId: string }> {
        console.log('Service - User ID:', userId, 'Product IDs:', productIds);
    
        if (!userId || !productIds.length) {
            throw new Error('Invalid userId or productIds');
        }
    
        const order = await this.orderRepository.createOrder(userId, productIds);
        return {
            id: order.id,
            totalAmount: order.totalAmount,
            orderDetailsId: order.orderDetails.id,
        };
    }

    async getOrder(orderId: string): Promise<Order | null> {
        return await this.orderRepository.findOrderById(orderId);
    }
}




