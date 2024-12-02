import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CategoryDto } from 'src/Dto/CategoryDto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getCategories(): Promise<Category[]>;
    addCategories(categoriesData: CategoryDto[]): Promise<Category[]>;
}
