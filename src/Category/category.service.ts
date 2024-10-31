import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.getCategories();
    }

    // Método para cargar las categorías desde JSON si no existen
    async preloadCategories(categoriesData: Partial<Category>[]): Promise<Category[]> {
        const categories = await Promise.all(
            categoriesData.map(async (categoryData) => {
                const existingCategory = await this.categoryRepository.findByName(categoryData.name);
                if (existingCategory) {
                    return existingCategory;
                }

                // Si no existe, creamos y guardamos la nueva categoría
                const newCategory = new Category();
                newCategory.name = categoryData.name;
                
                // Guardamos la categoría
                return await this.categoryRepository.addCategories([newCategory]);
            }),
        );

        // Retornamos todas las categorías creadas o ya existentes
        return categories.flat();
    }
}

