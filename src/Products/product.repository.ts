import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    getProducts(page: number, limit: number): Promise<Product[]> {
        const skip = (page - 1) * limit;
        return this.productRepo.find({
            skip,
            take: limit,
        });
    }

    getProductById(id: string): Promise<Product | null> {
        return this.productRepo.findOne({ where: { id } });
    }

    async createProduct(newProduct: Partial<Omit<Product, 'id'>>): Promise<Product> {
        const product = this.productRepo.create(newProduct);
        return await this.productRepo.save(product);
    }

    async updateProduct(id: string, updateProduct: Partial<Product>): Promise<Product | null> {
        await this.productRepo.update(id, updateProduct);
        return this.getProductById(id);
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productRepo.delete(id);
    }

    findAll(): Promise<Product[]> {
        return this.productRepo.find();
    }
}

