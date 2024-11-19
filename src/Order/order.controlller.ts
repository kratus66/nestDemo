import { Controller, Get, Post, Param, Body, HttpStatus, Res, NotFoundException, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard) // Proteger el endpoint con AuthGuard
    @Post()
    async addOrder(
        @Body() orderData: { userId: string; products: { id: string }[] },
        @Res() res: Response,
    ) {
        try {
            const productIds = orderData.products.map((product) => product.id);
            const order = await this.orderService.addOrder(orderData.userId, productIds);
            return res.status(HttpStatus.CREATED).json(order);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Order creation failed' });
        }
    }

    @UseGuards(AuthGuard) // Proteger el endpoint con AuthGuard
    @Get(':id')
    async getOrder(@Param('id') orderId: string, @Res() res: Response) {
        try {
            const order = await this.orderService.getOrder(orderId);
            if (!order) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: `Order with ID ${orderId} not found` });
            }
            return res.status(HttpStatus.OK).json(order);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to retrieve order' });
        }
    }
}



