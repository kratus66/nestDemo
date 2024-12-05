import { Controller, Get, Post, Param, Body, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/Dto/CreateOrderDto';
import { UsePipes, ValidationPipe } from '@nestjs/common';


@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    /* @UseGuards(AuthGuard) */
    @Post()
    @UsePipes(ValidationPipe)
    async addOrder(
        @Body() orderData: CreateOrderDto,
        @Res() res: Response
    ) {
        try {
            console.log('Received Order Data:', orderData);
            const { userId, products } = orderData;
            const productIds = products.map((product) => product.id);
            console.log('User ID:', userId, 'Product IDs:', productIds);
    
            const order = await this.orderService.addOrder(userId, productIds);
            return res.status(HttpStatus.CREATED).json(order);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    /* @UseGuards(AuthGuard) */
    @Get(':id')
    async getOrder(@Param('id') orderId: string, @Res() res: Response) {
        try {
            const order = await this.orderService.getOrder(orderId);
            if (!order) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Order not found' });
            }
            return res.status(HttpStatus.OK).json(order);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }
}




