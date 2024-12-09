import { Controller, Post, Get, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryDto } from 'src/Dto/CategoryDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('seeder')
    @ApiOperation({ summary: 'Pre-cargar categorías en la base de datos' })
    @ApiResponse({ status: 201, description: 'Categorías cargadas exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de categorías no válidos' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async addCategories(
        @Body() categoriesData: CategoryDto[],
        @Res() res: Response
    ) {
        if (!Array.isArray(categoriesData) || categoriesData.length === 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'El cuerpo de la solicitud debe ser un array con categorías válidas.',
            });
        }

        try {
            const result = await this.categoryService.addCategories(categoriesData);
            return res.status(HttpStatus.CREATED).json({
                message: 'Categories seeded successfully',
                result,
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Error desconocido';
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: errorMessage || 'Error adding categories',
            });
        }
    }

    @Get()
    async getCategories(): Promise<Category[]> {
        return await this.categoryService.getCategories();
    }
}



