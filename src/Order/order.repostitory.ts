import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, In } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../Users/users.entity';
import { Product } from '../Products/product.entity';
import { OrderDetails } from './orderDetails.entity';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,

        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepo: Repository<OrderDetails>,
    ) {}

    async createOrder(userId: string, productIds: string[]): Promise<Order> {
        console.log('Repository - Creating order for User ID:', userId);
        console.log('Repository - Product IDs:', productIds);
    
        if (!userId || !productIds || productIds.some(id => !id)) {
            throw new Error('Invalid userId or productIds');
        }
    
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
    
        const products = await this.productRepo.find({
            where: {
                id: In(productIds),
                stock: MoreThan(0),
            },
        });
    
        if (products.length === 0) {
            throw new NotFoundException(`No products available for purchase`);
        }
    
        const totalPrice = products.reduce((sum, product) => sum + Number(product.price), 0);
    
        const orderDetails = this.orderDetailsRepo.create({ price: totalPrice, products });
        await this.orderDetailsRepo.save(orderDetails);
    
        const order = this.orderRepo.create({ user, orderDetails, totalAmount: totalPrice });
        return await this.orderRepo.save(order);
    }

    async findOrderById(orderId: string): Promise<Order | null> {
        const order = await this.orderRepo.findOne({
            where: { id: orderId },
            relations: ['user', 'orderDetails', 'orderDetails.products'],
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${orderId} not found`);
        }

        return order;
    }
}

