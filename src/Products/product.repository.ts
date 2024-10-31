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

    // Obtener un producto por su ID
    getProductById(id: string): Promise<Product | null> {
        return this.productRepo.findOne({ where: { id } });
    }

    // Crear un nuevo producto
    async createProduct(newProduct: Partial<Omit<Product, 'id'>>): Promise<Product> {
        const product = this.productRepo.create(newProduct);
        return await this.productRepo.save(product);
    }

    // Actualizar un producto existente
    async updateProduct(id: string, updateProduct: Partial<Product>): Promise<Product | null> {
        await this.productRepo.update(id, updateProduct);
        return this.getProductById(id);
    }

    // Eliminar un producto por su ID
    async deleteProduct(id: string): Promise<void> {
        await this.productRepo.delete(id);
    }

    // Obtener todos los productos para evitar duplicados
    findAll(): Promise<Product[]> {
        return this.productRepo.find();
    }
}

