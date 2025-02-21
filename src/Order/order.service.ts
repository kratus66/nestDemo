import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repostitory";
import { Order } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async addOrder(userId: string, productData: { id: string; quantity: number }[]): Promise<{ id: string; totalAmount: number; orderDetailsId: string; status: string }> {
        console.log("Service - User ID:", userId, "Product Data:", productData);
    
        if (!userId || !productData.length) {
            throw new Error("Invalid userId or product data");
        }
    
        const order = await this.orderRepository.createOrder(userId, productData);
        return {
            id: order.id,
            totalAmount: order.totalAmount,
            orderDetailsId: order.orderDetails?.id,
            status: order.orderDetails?.status,
        };
    }

    async getOrder(orderId: string): Promise<Order | null> {
        return await this.orderRepository.findOrderById(orderId);
    }
}






