import { Controller, Get, Post, Param, Body, HttpStatus, Res, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/Dto/CreateOrderDto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard) 
    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Crear una nueva orden' })
    @ApiResponse({ status: 201, description: 'Orden creada con éxito' })
    @ApiResponse({ status: 400, description: 'Solicitud inválida' })
    async addOrder(
        @Body() orderData: CreateOrderDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
            const user = (req as any).user;

            if (!user) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Usuario no autenticado' });
            }

            console.log('Received Order Data:', orderData);
            const productData = orderData.products.map(product => ({ id: product.id, quantity: product.quantity }));
            console.log('User ID:', user.sub, 'Product Data:', productData);
    
            const order = await this.orderService.addOrder(user.sub, productData);
            return res.status(HttpStatus.CREATED).json(order);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Obtener detalles de una orden por ID' })
    @ApiResponse({ status: 200, description: 'Orden encontrada' })
    @ApiResponse({ status: 404, description: 'Orden no encontrada' })
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
