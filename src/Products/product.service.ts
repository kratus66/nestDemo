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

    async seedProducts() {
        const productData = await import("../data/products.json");
        if (!productData || !Array.isArray(productData)) {
            throw new BadRequestException("Product data is not loaded or is invalid.");
        }

        const existingProducts = await this.productRepository.findAll();
        const newProducts = productData.filter(
            (newProduct) => !existingProducts.some((prod) => prod.name === newProduct.name)
        );

        for (const product of newProducts) {
            const category = await this.categoryRepository.findByName(product.category);
            if (category) {
                await this.createProduct({ ...product, category: category.name });
            }
        }

        return newProducts;
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
