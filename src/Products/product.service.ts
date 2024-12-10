import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../Category/category.repository";
import { Product } from "./product.entity";
import { CreateProductDto } from "../Dto/CreateProductDto";
import { UpdateProductDto } from "../Dto/UpdateProductDto";
import { Category } from "src/Category/category.entity";

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async seedProducts(products: CreateProductDto[]) {
        if (!products || !Array.isArray(products)) {
            throw new BadRequestException("Invalid product data provided.");
        }
    
        const createdProducts = [];
        for (const product of products) {
            try {
                const category = await this.categoryRepository.findByName(product.category);
                if (!category) {
                    console.warn(`Category "${product.category}" not found. Skipping product "${product.name}".`);
                    continue;
                }
                const createdProduct = await this.createProduct({ ...product, category: category.name });
                createdProducts.push(createdProduct);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(`Error creating product "${product.name}": ${err.message}`);
                } else {
                    console.error(`Unexpected error creating product "${product.name}": ${JSON.stringify(err)}`);
                }
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
        const product = await this.getProductById(id); // Verifica que el producto exista
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found.`);
        }
        await this.productRepository.deleteProduct(id);
    }

    async createProduct(productData: CreateProductDto): Promise<Product> {
        const category = await this.categoryRepository.findByName(productData.category);
        if (!category) {
            throw new NotFoundException(`Category with name "${productData.category}" not found.`);
        }

        return this.productRepository.createProduct({
            ...productData,
            stock: productData.stock,
            category,
        });
    }

    async updateProduct(id: string, productData: UpdateProductDto): Promise<Product> {
        const product = await this.getProductById(id); // Verifica que el producto exista
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found.`);
        }
    
        let categoryEntity: Category | undefined;
    
        // Si se incluye una categoría, conviértela al tipo correcto
        if (productData.category) {
            const category = await this.categoryRepository.findByName(productData.category);
            if (!category) {
                throw new NotFoundException(`Category with name "${productData.category}" not found.`);
            }
            categoryEntity = category;
        }
    
        // Pasa los datos actualizados al repositorio, asegurando el tipo correcto de category
        return this.productRepository.updateProduct(id, {
            ...productData,
            category: categoryEntity, // Cambia la categoría si se especifica
        });
    }
    
}
