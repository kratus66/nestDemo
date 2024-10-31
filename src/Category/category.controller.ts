import { Controller, Post, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import * as fs from 'fs';
import * as path from 'path';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('seeder')
    async seedCategories(): Promise<Category[]> {
        // Ruta absoluta al archivo JSON
        const filePath = path.join(process.cwd(), 'src', 'data', 'categories.json');

        let categoriesData;
        
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            categoriesData = JSON.parse(fileContent);
            console.log('Archivo JSON cargado:', categoriesData);  // Confirmación de lectura
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
            throw new HttpException('No se pudo cargar el archivo de categorías', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!categoriesData || categoriesData.length === 0) {
            throw new HttpException('No se encontraron datos de categorías para el seeder', HttpStatus.NOT_FOUND);
        }

        return await this.categoryService.preloadCategories(categoriesData);
    }

    @Get()
    async getCategories(): Promise<Category[]> {
        return await this.categoryService.getCategories();
    }
}


