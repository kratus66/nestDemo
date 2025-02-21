import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../Users/users.entity';
import { Product } from '../Products/product.entity';
import { OrderDetails } from './orderDetails.entity';
import { EntityManager } from 'typeorm';


@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(OrderDetails) private orderDetailsRepo: Repository<OrderDetails>,
    ) {}

    async createOrder(userId: string, productData: { id: string; quantity: number }[]): Promise<Order> {
        console.log('Repository - Creating order for User ID:', userId);
        console.log('Repository - Product Data:', productData);

        if (!userId || !productData || productData.some(p => !p.id || p.quantity <= 0)) {
            throw new BadRequestException('Invalid userId or product data');
        }

        // Obtener una conexión transaccional
        return await this.orderRepo.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            // Verificar si el usuario existe
            const user = await transactionalEntityManager.findOne(User, { where: { id: userId } });
            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }

            // Obtener los productos de la base de datos con un bloqueo para evitar condiciones de carrera
            const productIds = productData.map((p) => p.id);
            const products = await transactionalEntityManager.find(Product, { where: { id: In(productIds) } });

            if (products.length === 0) {
                throw new NotFoundException(`No products available for purchase`);
            }

            // Verificar si hay suficiente stock
            for (const p of productData) {
                const product: Product | undefined = products.find((prod: Product) => prod.id === p.id);
                if (!product) {
                    throw new NotFoundException(`Product with ID ${p.id} not found`);
                }
                if (product.stock < p.quantity) {
                    throw new BadRequestException(
                        `Insufficient stock for product ${product.id}. Available: ${product.stock}, Requested: ${p.quantity}`
                    );
                }
            }

            // Reducir el stock de los productos
            for (const p of productData) {
                const product: Product | undefined = products.find((prod: Product) => prod.id === p.id);
                if (product) {
                    product.stock -= p.quantity;
                    await transactionalEntityManager.save(Product, product); // Guardar el nuevo stock en la base de datos
                }
            }

            // Calcular el precio total de la orden considerando la cantidad de cada producto
            const totalPrice = productData.reduce((sum, p) => {
                const product: Product | undefined = products.find((prod: Product) => prod.id === p.id);
                return sum + (product ? Number(product.price) * p.quantity : 0);
            }, 0);

            // Crear detalles de la orden
            const orderDetails = transactionalEntityManager.create(OrderDetails, {
                price: totalPrice,
                quantity: productData.reduce((sum, p) => sum + p.quantity, 0), // Sumar la cantidad total de productos
                status: 'Pendiente', // Agregar estado de la orden
                products, // Asociar productos
            });
            await transactionalEntityManager.save(OrderDetails, orderDetails);

            // Crear la orden con el usuario, los detalles y el precio total
            const order = transactionalEntityManager.create(Order, {
                user,
                orderDetails,
                totalAmount: totalPrice,
            });

            return await transactionalEntityManager.save(Order, order);
        });
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

    

