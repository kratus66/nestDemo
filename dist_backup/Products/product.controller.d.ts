import { ProductService } from "./product.service";
import { Product } from "../Interfaces/Product";
import { Response } from "express";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts(res: Response, page?: number, limit?: number): Promise<Response<any, Record<string, any>>>;
    getProductById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    seedProducts(res: Response): Promise<Response<any, Record<string, any>>>;
    createProduct(product: Omit<Product, 'id'> & {
        category: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProduct(id: string, product: Partial<Product> & {
        category?: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteProduct(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
