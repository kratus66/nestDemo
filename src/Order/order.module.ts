import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetails } from './orderDetails.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controlller';
import { User } from '../Users/users.entity';
import { Product } from '../Products/product.entity';
import { OrderRepository } from '../Order/order.repostitory'
import { AuthModule } from 'src/Auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderDetails, User, Product]), 
        AuthModule // Se aseguran las entidades
    ],
    providers: [OrderService, OrderRepository], // Se agregan los servicios y repositorios como providers
    controllers: [OrderController],
    exports: [OrderService, OrderRepository], // Se exporta para otros módulos si es necesario
})
export class OrderModule {}
