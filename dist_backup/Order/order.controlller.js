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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const auth_guard_1 = require("../Auth/auth.guard");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async addOrder(orderData, res) {
        try {
            const { userId, products } = orderData;
            const productIds = products.map((product) => product.id);
            const order = await this.orderService.addOrder(userId, productIds);
            return res.status(common_1.HttpStatus.CREATED).json(order);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
    async getOrder(orderId, res) {
        try {
            const order = await this.orderService.getOrder(orderId);
            if (!order) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Order not found' });
            }
            return res.status(common_1.HttpStatus.OK).json(order);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addOrder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controlller.js.map