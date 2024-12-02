import { Repository } from "typeorm";
import { Product } from "./product.entity";
export declare class ProductRepository {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    getProducts(page?: number, limit?: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(newProduct: Partial<Omit<Product, 'id'>>): Promise<Product>;
    updateProduct(id: string, updateProduct: Partial<Product>): Promise<Product | null>;
    deleteProduct(id: string): Promise<void>;
    findAll(): Promise<Product[]>;
}
