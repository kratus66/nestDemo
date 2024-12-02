import { Repository } from 'typeorm';
import { Category } from './category.entity';
export declare class CategoryRepository {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getCategories(): Promise<Category[]>;
    addCategories(categories: Category[]): Promise<Category[]>;
    findByName(name: string): Promise<Category | null>;
}
