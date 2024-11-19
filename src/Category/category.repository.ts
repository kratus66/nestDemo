import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async addCategories(categories: Category[]): Promise<Category[]> {
        const existingCategories = await this.categoryRepository.find();
        
        // Filtramos las categorías que ya existen
        const newCategories = categories.filter(
            (category) => 
                !existingCategories.some(
                    (existingCategory) => existingCategory.name === category.name
                ),
        );

        // Guardamos solo las categorías nuevas
        return await this.categoryRepository.save(newCategories);
    }

    async findByName(name: string): Promise<Category | null> {
        return await this.categoryRepository.findOne({ where: { name } });
    }
}