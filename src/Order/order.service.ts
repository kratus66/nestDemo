import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepository } from "./order.repostitory";
import { Order } from "./order.entity";

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async addOrder(userId: string, productIds: string[]): Promise<Order> {
        return await this.orderRepository.createOrder(userId, productIds);
    }

    async getOrder(orderId: string): Promise<Order> {
        const order = await this.orderRepository.findOrderById(orderId);
        if (!order) {
            throw new NotFoundException(`Order with ID ${orderId} not found`);
        }
        return order;
    }
}

