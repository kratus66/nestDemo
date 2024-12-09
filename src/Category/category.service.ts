import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CategoryDto } from 'src/Dto/CategoryDto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.getCategories();
    }

    async addCategories(categoriesData: CategoryDto[]): Promise<Category[]> {
        if (!categoriesData || categoriesData.length === 0) {
            throw new BadRequestException('No se proporcionaron categorías para agregar.');
        }

        const categories = categoriesData.map((data) => {
            const newCategory = new Category();
            newCategory.name = data.name;
            return newCategory;
        });

        try {
            return await this.categoryRepository.addCategories(categories);
        } catch (error) {
            throw new InternalServerErrorException('Error al agregar categorías.');
        }
    }
}


