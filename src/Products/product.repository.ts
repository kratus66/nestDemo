import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    getProducts(page: number=1, limit: number=5): Promise<Product[]> {
        return this.productRepo.find({ skip: (page - 1) * limit, take: limit });
    }

    getProductById(id: string): Promise<Product | null> {
        return this.productRepo.findOne({ where: { id } });
    }

    async createProduct(newProduct: Partial<Product>): Promise<Product> {
        return await this.productRepo.save(this.productRepo.create(newProduct));
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productRepo.delete(id);
    }

    async findByName(name: string): Promise<Product | null> {
        return this.productRepo.findOne({ where: { name } });
    }
    async updateProduct(id: string, updateData: Partial<Product>): Promise<Product> {
        await this.productRepo.update(id, updateData);
        const updatedProduct = await this.getProductById(id);
    
        if (!updatedProduct) {
            throw new NotFoundException(`Failed to update product with ID ${id}.`);
        }
    
        return updatedProduct;
    }
}


