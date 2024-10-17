import { Module } from "@nestjs/common";
import { productService } from "./productService";
import { productController } from "./productController";


@Module({
    imports:[],
    controllers:[productController],
    providers:[productService],
})

export class productModule{}