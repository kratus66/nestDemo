import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetails } from './orderDetails.entity';
import { Product } from '../Products/product.entity';
import { User } from '../Users/users.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controlller';
import { OrderRepository } from './order.repostitory';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderDetails, Product, User]),
    ],
    providers: [OrderService, OrderRepository],
    controllers: [OrderController],
})
export class OrderModule {}
