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
exports.OrderDetails = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../Products/product.entity");
let OrderDetails = class OrderDetails {
};
exports.OrderDetails = OrderDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OrderDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.Product, (product) => product.orderDetails),
    (0, typeorm_1.JoinTable)({
        name: "order_details_products",
        joinColumn: { name: "order_details_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], OrderDetails.prototype, "products", void 0);
exports.OrderDetails = OrderDetails = __decorate([
    (0, typeorm_1.Entity)({ name: "order_details" })
], OrderDetails);
//# sourceMappingURL=orderDetails.entity.js.map