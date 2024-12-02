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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../Users/users.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.orders),
    __metadata("design:type", users_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orderDetails_entity_1.OrderDetails, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", orderDetails_entity_1.OrderDetails)
], Order.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2, nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: "orders" })
], Order);
//# sourceMappingURL=order.entity.js.map