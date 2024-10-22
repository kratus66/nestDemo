import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { productController } from "./product.controller";
import { ProductRepository } from "./product.repository";


@Module({
    imports:[],
    controllers:[productController],
    providers:[ProductService, ProductRepository],
})

export class productModule{}