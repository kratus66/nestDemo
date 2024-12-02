"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./Auth/auth.module");
const user_module_1 = require("./Users/user.module");
const products_module_1 = require("./Products/products.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("./config/typeorm");
const category_module_1 = require("./Category/category.module");
const files_module_1 = require("./Cloudinary/files.module");
const jwt_1 = require("@nestjs/jwt");
const order_module_1 = require("./Order/order.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default]
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get("typeorm"),
            }),
            auth_module_1.AuthModule,
            order_module_1.OrderModule,
            user_module_1.UserModule,
            products_module_1.ProductModule,
            category_module_1.CategoryModule,
            files_module_1.FilesModule,
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '1h' },
                secret: process.env.JWT_SECRET,
            })
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map