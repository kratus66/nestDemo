import { Controller, Get, Post, Param, Body, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard)
    @Post()
    async addOrder(
        @Body() orderData: { userId: string; products: { id: string }[] },
        @Res() res: Response
    ) {
        try {
            const { userId, products } = orderData;
            const productIds = products.map((product) => product.id);
            const order = await this.orderService.addOrder(userId, productIds);
            return res.status(HttpStatus.CREATED).json(order);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    @UseGuards(AuthGuard)
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




