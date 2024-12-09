import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Res,
    HttpStatus,
    Query,
    UseGuards,
    HttpException,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Response } from "express";
import { AuthGuard } from "src/Auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/constants/roles.enum";
import { CreateProductDto } from "src/Dto/CreateProductDto";
import { UpdateProductDto } from "src/Dto/UpdateProductDto";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("Products")
@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: "Get a paginated list of products" })
    async getProducts(
        @Res() res: Response,
        @Query("page") page: number = 1,
        @Query("limit") limit: number = 5
    ) {
        try {
            const products = await this.productService.getProducts(page, limit);
            return res.status(HttpStatus.OK).json(products);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a product by its ID" })
    async getProductById(@Param("id") id: string, @Res() res: Response) {
        try {
            const product = await this.productService.getProductById(id);
            if (product) {
                return res.status(HttpStatus.OK).json(product);
            }
            return res.status(HttpStatus.NOT_FOUND).json({
                message: `Product with ID ${id} not found`,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    @Post("seeder")
    @ApiOperation({ summary: "Seed products data" })
    async seedProducts(@Res() res: Response) {
        try {
            const result = await this.productService.seedProducts();
            return res.status(HttpStatus.CREATED).json({
                message: "Products seeded successfully",
                result,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

   /*  @UseGuards(AuthGuard) */
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: "Create a new product" })
    async createProduct(
        @Body() createProductDto: CreateProductDto,
        @Res() res: Response
    ) {
        try {
            const newProduct = await this.productService.createProduct(createProductDto);
            return res.status(HttpStatus.CREATED).json(newProduct);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    /* @UseGuards(AuthGuard) */
    @Roles(Role.ADMIN)
    @Put(":id")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Update a product by its ID" })
    async updateProduct(
        @Param("id") id: string,
        @Body() updateProductDto: UpdateProductDto,
        @Res() res: Response
    ) {
        try {
            const updatedProduct = await this.productService.updateProduct(id, updateProductDto);
            if (updatedProduct) {
                return res.status(HttpStatus.OK).json(updatedProduct);
            }
            return res.status(HttpStatus.NOT_FOUND).json({
                message: `Product with ID ${id} not found`,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }

    /* @UseGuards(AuthGuard) */
    @Roles(Role.ADMIN)
    @Delete(":id")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete a product by its ID" })
    async deleteProduct(@Param("id") id: string, @Res() res: Response) {
        try {
            await this.productService.deleteProduct(id);
            return res.status(HttpStatus.OK).json({
                message: `Product with ID ${id} deleted successfully`,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
        }
    }
}
