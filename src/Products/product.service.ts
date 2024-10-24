import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "../Interfaces/Product";

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    // Obtener todos los productos
    async getProducts(page:number,limit:number): Promise<Product[]> {
        return this.productRepository.getProducts(page,limit);
    }

    // Obtener un producto por su ID
    async getProductById(id: number): Promise<Product | null> {
        return this.productRepository.getProductById(id);
    }

    // Crear un nuevo producto
    async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
        return this.productRepository.createProduct(product);
    }

    // Actualizar un producto por su ID
    async updateProduct(id: number, product: Partial<Product>): Promise<Product | null> {
        return this.productRepository.updateProduct(id, product);
    }

    // Eliminar un producto por su ID
    async deleteProduct(id: number): Promise<void> {
        this.productRepository.deleteProduct(id);
    }
}
