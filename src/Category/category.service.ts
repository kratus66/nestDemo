import { Injectable } from '@nestjs/common';
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
        const categories = categoriesData.map((data) => {
            const newCategory = new Category();
            newCategory.name = data.name;
            return newCategory;
        });
        
        return await this.categoryRepository.addCategories(categories);
    }
}


