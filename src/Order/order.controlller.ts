import { Controller, Get, Post, Param, Body, HttpStatus, Res, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard)
    @Post()
    async addOrder(
        @Body() orderData: { products: { id: string }[] },
        @Request() req: any, // Usar el payload del token JWT
        @Res() res: Response,
    ) {
        try {
            const userId = req.user.sub; // Obtener el userId del JWT
            const productIds = orderData.products.map((product) => product.id);
            const order = await this.orderService.addOrder(userId, productIds);
            return res.status(HttpStatus.CREATED).json(order);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}




