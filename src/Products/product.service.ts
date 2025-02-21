import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../Category/category.repository";
import { Product } from "./product.entity";
import { CreateProductDto } from "../Dto/CreateProductDto";
import { UpdateProductDto } from "../Dto/UpdateProductDto";
import * as productsData from "../data/products.json";
import { Category } from "src/Category/category.entity";

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async seedProducts() {
        const createdProducts = [];

        for (const product of productsData) {
            try {
                const category = await this.categoryRepository.findByName(product.category);
                if (!category) {
                    console.warn(`Category "${product.category}" not found. Skipping product "${product.name}".`);
                    continue;
                }

                const existingProduct = await this.productRepository.findByName(product.name);
                if (existingProduct) {
                    console.warn(`Product "${product.name}" already exists. Skipping.`);
                    continue;
                }

                const createdProduct = await this.createProduct({ ...product, category: category.id });
                createdProducts.push(createdProduct);
            } catch (err) {
                console.error(`Error creating product "${product.name}": ${(err as Error).message}`);
            }
        }

        return createdProducts;
    }

    async getProducts(page = 1, limit = 5): Promise<Product[]> {
        return this.productRepository.getProducts(page, limit);
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productRepository.getProductById(id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found.`);
        }
        return product;
    }

    async deleteProduct(id: string): Promise<void> {
        await this.getProductById(id);
        await this.productRepository.deleteProduct(id);
    }

    async createProduct(productData: CreateProductDto): Promise<Product> {
        const category = await this.categoryRepository.findByName(productData.category);
        if (!category) {
            throw new NotFoundException(`Category with name "${productData.category}" not found.`);
        }

        return this.productRepository.createProduct({ ...productData, category });
    }

    async updateProduct(id: string, productData: UpdateProductDto): Promise<Product> {
        await this.getProductById(id);
    
        let categoryEntity: Category | undefined = undefined;
    
        // Si el usuario envía una nueva categoría, buscarla y asignarla correctamente
        if (productData.category) {
            const category = await this.categoryRepository.findByName(productData.category);
            if (!category) {
                throw new NotFoundException(`Category with name "${productData.category}" not found.`);
            }
            categoryEntity = category; // Se asigna la entidad completa en lugar del ID
        }
    
        // Actualizar el producto con la categoría convertida correctamente
        return this.productRepository.updateProduct(id, {
            ...productData,
            category: categoryEntity, // Se pasa la entidad en lugar del string
        });
    }
    

}
