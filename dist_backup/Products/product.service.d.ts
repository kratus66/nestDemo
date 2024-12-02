import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../Category/category.repository";
import { Product } from "./product.entity";
export declare class ProductService {
    private readonly productRepository;
    private categoryRepository;
    constructor(productRepository: ProductRepository, categoryRepository: CategoryRepository);
    seedProducts(): Promise<{
        name: string;
        description: string;
        price: number;
        stock: number;
        category: string;
    }[]>;
    getProducts(page?: number, limit?: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    deleteProduct(id: string): Promise<void>;
    createProduct(productData: Partial<Omit<Product, 'id' | 'category'>> & {
        category: string;
    }): Promise<Product>;
    updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'category'>> & {
        category?: string;
    }): Promise<Product | null>;
}
