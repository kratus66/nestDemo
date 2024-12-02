import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "../Interfaces/Product";
import { Response } from "express";
import { AuthGuard } from "src/Auth/auth.guard";
import { Role } from "src/constants/roles.enum";
import { Roles } from "src/decorators/roles.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getProducts(@Res() res: Response, @Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        const products = await this.productService.getProducts(page, limit);
        return res.status(HttpStatus.OK).json(products);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string, @Res() res: Response) {
        const product = await this.productService.getProductById(id);
        if (product) {
            return res.status(HttpStatus.OK).json(product);
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: `Product with ID ${id} not found` });
    }

    @Post('seeder')
    async seedProducts(@Res() res: Response) {
        const result = await this.productService.seedProducts();
        return res.status(HttpStatus.CREATED).json({ message: "Products seeded successfully", result });
    }

    @UseGuards(AuthGuard)
    @Post()
    async createProduct(@Body() product: Omit<Product, 'id'> & { category: string }, @Res() res: Response) {
        const stockValue = typeof product.stock === 'boolean' ? (product.stock ? 1 : 0) : product.stock;
        const newProduct = await this.productService.createProduct({ ...product, stock: stockValue, category: product.category });
        return res.status(HttpStatus.CREATED).json({ id: newProduct.id });
    }

    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Partial<Product> & { category?: string }, @Res() res: Response) {
        const stockValue = typeof product.stock === 'boolean' ? (product.stock ? 1 : 0) : product.stock;
        const updatedProduct = await this.productService.updateProduct(id, { ...product, stock: stockValue, category: product.category });
        if (updatedProduct) {
            return res.status(HttpStatus.OK).json({ id: updatedProduct.id });
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: `Product with ID ${id} not found` });
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: string, @Res() res: Response) {
        await this.productService.deleteProduct(id);
        return res.status(HttpStatus.OK).json({ message: `Product with ID ${id} deleted successfully` });
    }
}

