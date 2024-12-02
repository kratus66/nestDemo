"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = exports.config = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
const users_entity_1 = require("../Users/users.entity");
const order_entity_1 = require("../Order/order.entity");
const orderDetails_entity_1 = require("../Order/orderDetails.entity");
const product_entity_1 = require("../Products/product.entity");
const category_entity_1 = require("../Category/category.entity");
(0, dotenv_1.config)({ path: ".env.development" });
console.log(`Database: ${process.env.DB_NAME}`);
exports.config = {
    type: "postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [users_entity_1.User, order_entity_1.Order, orderDetails_entity_1.OrderDetails, product_entity_1.Product, category_entity_1.Category],
    migrations: ["dist/migrations/*{.ts,.js}"],
    synchronize: false,
    logging: true,
};
exports.default = (0, config_1.registerAs)("typeorm", () => exports.config);
exports.connectionSource = new typeorm_1.DataSource(exports.config);
//# sourceMappingURL=typeorm.js.map