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
        // 1. Buscar el usuario por ID
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // 2. Buscar productos con stock disponible
        const products = await this.productRepo.find({
            where: {
                id: In(productIds),
                stock: MoreThan(0),
            },
        });

        if (products.length === 0) {
            throw new NotFoundException(`No products available for purchase`);
        }

        // 3. Calcular el precio total y reducir el stock de cada producto
        const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

        for (const product of products) {
            product.stock -= 1;
            await this.productRepo.save(product);
        }

        // 4. Crear el detalle de la orden
        const orderDetails = this.orderDetailsRepo.create({ price: totalPrice, products });
        await this.orderDetailsRepo.save(orderDetails);

        // 5. Crear la orden y asociarla al usuario y a los detalles
        const order = this.orderRepo.create({ user, orderDetails, totalAmount: totalPrice });
        return await this.orderRepo.save(order);
    }

    async findOrderById(orderId: string): Promise<Order | null> {
        return await this.orderRepo.findOne({
            where: { id: orderId },
            relations: ['user', 'orderDetails', 'orderDetails.products'],
        });
    }
}



