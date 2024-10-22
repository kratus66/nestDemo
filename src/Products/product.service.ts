import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";

@Injectable()

export class ProductService{
    constructor(
        private productRepository: ProductRepository,
    ){}
    async getProducts():Promise<{id:number,name:string,description:string,price:number,stock:boolean,imgUrl:string}[]>{
        return this.productRepository.getProduct();
    }
}