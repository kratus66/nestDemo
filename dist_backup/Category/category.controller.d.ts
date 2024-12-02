import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryDto } from 'src/Dto/CategoryDto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    addCategories(categories: CategoryDto[]): Promise<Category[]>;
    getCategories(): Promise<Category[]>;
}
