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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
let ProductRepository = class ProductRepository {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    getProducts(page = 1, limit = 5) {
        const skip = (page - 1) * limit;
        return this.productRepo.find({
            skip,
            take: limit,
        });
    }
    getProductById(id) {
        return this.productRepo.findOne({ where: { id } });
    }
    async createProduct(newProduct) {
        const product = this.productRepo.create(newProduct);
        return await this.productRepo.save(product);
    }
    async updateProduct(id, updateProduct) {
        await this.productRepo.update(id, updateProduct);
        return this.getProductById(id);
    }
    async deleteProduct(id) {
        await this.productRepo.delete(id);
    }
    findAll() {
        return this.productRepo.find();
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map