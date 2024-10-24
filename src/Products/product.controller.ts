import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, Query, UseGuards} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "../Interfaces/Product";
import { Response } from "express";
import { AuthGuard } from "src/Auth/auth.guard";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getProducts(@Res() res: Response,@Query('page') page:number=1, @Query('limit') limit:number=5) {
        const products = await this.productService.getProducts(page,limit);
        return res.status(HttpStatus.OK).json(products);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string, @Res() res: Response) {
        const product = await this.productService.getProductById(Number(id));
        if (product) {
            return res.status(HttpStatus.OK).json(product);
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: `Product with ID ${id} not found` });
    }
    @UseGuards(AuthGuard)
    @Post()
    async createProduct(@Body() product: Omit<Product, 'id'>, @Res() res: Response) {
        const newProduct = await this.productService.createProduct(product);
        return res.status(HttpStatus.CREATED).json({ id: newProduct.id });
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Partial<Product>, @Res() res: Response) {
        const updatedProduct = await this.productService.updateProduct(Number(id), product);
        if (updatedProduct) {
            return res.status(HttpStatus.OK).json({ id: updatedProduct.id });
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: `Product with ID ${id} not found` });
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: string, @Res() res: Response) {
        await this.productService.deleteProduct(Number(id));
        return res.status(HttpStatus.OK).json({ message: `Product with ID ${id} deleted successfully` });
    }
}
