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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("./product.repository");
const category_repository_1 = require("../Category/category.repository");
const productData = require("../data/products.json");
let ProductService = class ProductService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async seedProducts() {
        if (!productData || !Array.isArray(productData)) {
            throw new Error('Product data is not loaded or is invalid.');
        }
        const existingProducts = await this.productRepository.findAll();
        const newProducts = productData.filter((newProduct) => !existingProducts.some((prod) => prod.name === newProduct.name));
        for (const product of newProducts) {
            const category = await this.categoryRepository.findByName(product.category);
            if (category) {
                const stockValue = typeof product.stock === 'boolean' ? (product.stock ? 1 : 0) : product.stock;
                await this.createProduct({ ...product, stock: stockValue, category: category.name });
            }
        }
        return newProducts;
    }
    async getProducts(page = 1, limit = 5) {
        return this.productRepository.getProducts(page, limit);
    }
    async getProductById(id) {
        return this.productRepository.getProductById(id);
    }
    async deleteProduct(id) {
        await this.productRepository.deleteProduct(id);
    }
    async createProduct(productData) {
        const category = await this.categoryRepository.findByName(productData.category);
        if (!category) {
            throw new Error(`Category with name ${productData.category} not found`);
        }
        const stockValue = typeof productData.stock === 'boolean' ? (productData.stock ? 1 : 0) : productData.stock;
        return this.productRepository.createProduct({ ...productData, stock: stockValue, category });
    }
    async updateProduct(id, productData) {
        const category = productData.category ? await this.categoryRepository.findByName(productData.category) : undefined;
        const stockValue = typeof productData.stock === 'boolean' ? (productData.stock ? 1 : 0) : productData.stock;
        return this.productRepository.updateProduct(id, { ...productData, stock: stockValue, category });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        category_repository_1.CategoryRepository])
], ProductService);
//# sourceMappingURL=product.service.js.map