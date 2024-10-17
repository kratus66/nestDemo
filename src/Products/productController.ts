import { Controller } from "@nestjs/common";
import { ProductService } from "./productService";

@Controller("products")

export class productController{
    constructor (private readonly productService: ProductService){}
}