import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryDto } from 'src/Dto/CategoryDto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('seeder')
    async addCategories(@Body() categories: CategoryDto[]): Promise<Category[]> {
        try {
            return await this.categoryService.addCategories(categories);
        } catch (error) {
            throw new HttpException('Error adding categories', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getCategories(): Promise<Category[]> {
        return await this.categoryService.getCategories();
    }
}



