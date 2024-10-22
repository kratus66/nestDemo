import { Controller, Get } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("products")

export class productController{
    constructor (private readonly productService: ProductService){

    }
    @Get()
    getProducts(){
        return this.productService.getProducts();
    }
}