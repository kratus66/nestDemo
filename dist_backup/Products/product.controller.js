"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const auth_guard_1 = require("../Auth/auth.guard");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getProducts(res, page = 1, limit = 5) {
        const products = await this.productService.getProducts(page, limit);
        return res.status(common_1.HttpStatus.OK).json(products);
    }
    async getProductById(id, res) {
        const product = await this.productService.getProductById(id);
        if (product) {
            return res.status(common_1.HttpStatus.OK).json(product);
        }
        return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: `Product with ID ${id} not found` });
    }
    async seedProducts(res) {
        const result = await this.productService.seedProducts();
        return res.status(common_1.HttpStatus.CREATED).json({ message: "Products seeded successfully", result });
    }
    async createProduct(product, res) {
        const stockValue = typeof product.stock === 'boolean' ? (product.stock ? 1 : 0) : product.stock;
        const newProduct = await this.productService.createProduct({ ...product, stock: stockValue, category: product.category });
        return res.status(common_1.HttpStatus.CREATED).json({ id: newProduct.id });
    }
    async updateProduct(id, product, res) {
        const stockValue = typeof product.stock === 'boolean' ? (product.stock ? 1 : 0) : product.stock;
        const updatedProduct = await this.productService.updateProduct(id, { ...product, stock: stockValue, category: product.category });
        if (updatedProduct) {
            return res.status(common_1.HttpStatus.OK).json({ id: updatedProduct.id });
        }
        return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: `Product with ID ${id} not found` });
    }
    async deleteProduct(id, res) {
        await this.productService.deleteProduct(id);
        return res.status(common_1.HttpStatus.OK).json({ message: `Product with ID ${id} deleted successfully` });
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)('seeder'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "seedProducts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map