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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const users_entity_1 = require("../Users/users.entity");
const product_entity_1 = require("../Products/product.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
let OrderRepository = class OrderRepository {
    constructor(orderRepo, userRepo, productRepo, orderDetailsRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.orderDetailsRepo = orderDetailsRepo;
    }
    async createOrder(userId, productIds) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const products = await this.productRepo.find({
            where: {
                id: (0, typeorm_2.In)(productIds),
                stock: (0, typeorm_2.MoreThan)(0),
            },
        });
        if (products.length === 0) {
            throw new common_1.NotFoundException(`No products available for purchase`);
        }
        const totalPrice = products.reduce((sum, product) => sum + Number(product.price), 0);
        for (const product of products) {
            product.stock -= 1;
            await this.productRepo.save(product);
        }
        const orderDetails = this.orderDetailsRepo.create({ price: totalPrice, products });
        await this.orderDetailsRepo.save(orderDetails);
        const order = this.orderRepo.create({ user, orderDetails, totalAmount: totalPrice });
        return await this.orderRepo.save(order);
    }
    async findOrderById(orderId) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId },
            relations: ['user', 'orderDetails', 'orderDetails.products'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        return order;
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderRepository);
//# sourceMappingURL=order.repostitory.js.map