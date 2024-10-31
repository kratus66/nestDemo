import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../Category/category.repository";
import { Product } from "./product.entity";
import productData from "../data/products.json";

@Injectable()
export class ProductService {
    constructor(
        private productRepository: ProductRepository,
        private categoryRepository: CategoryRepository,
    ) {}

    // Seed products desde archivo JSON
    async seedProducts() {
        const existingProducts = await this.productRepository.findAll();

        const newProducts = productData.filter(
            (newProduct) => !existingProducts.some((prod) => prod.name === newProduct.name)
        );

        for (const product of newProducts) {
            const category = await this.categoryRepository.findByName(product.category);
            if (category) {
                const stockValue = typeof product.stock === 'boolean' ? (product.stock ? 1 : 0) : product.stock;
                await this.createProduct({
                    ...product,
                    stock: stockValue,
                    category: category.name, // Pasamos el nombre de la categoría
                });
            }
        }
        return newProducts;
    }

    async getProducts(page: number, limit: number): Promise<Product[]> {
        return this.productRepository.getProducts(page, limit);
    }

    async getProductById(id: string): Promise<Product | null> {
        return this.productRepository.getProductById(id);
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productRepository.deleteProduct(id);
    }

    async createProduct(productData: Partial<Omit<Product, 'id' | 'category'>> & { category: string }): Promise<Product> {
        const category = await this.categoryRepository.findByName(productData.category);
        if (!category) {
            throw new Error(`Category with name ${productData.category} not found`);
        }

        const stockValue = typeof productData.stock === 'boolean' ? (productData.stock ? 1 : 0) : productData.stock;

        return this.productRepository.createProduct({
            ...productData,
            stock: stockValue,
            category,
        });
    }

    async updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'category'>> & { category?: string }): Promise<Product | null> {
        const category = productData.category ? await this.categoryRepository.findByName(productData.category) : undefined;

        const stockValue = typeof productData.stock === 'boolean' ? (productData.stock ? 1 : 0) : productData.stock;

        return this.productRepository.updateProduct(id, {
            ...productData,
            stock: stockValue,
            category,
        });
    }
}





