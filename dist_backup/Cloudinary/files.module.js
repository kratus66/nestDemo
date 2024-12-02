"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const files_service_1 = require("./files.service");
const files_controller_1 = require("./files.controller");
const cloudinary_1 = require("../config/cloudinary");
const product_entity_1 = require("../products/product.entity");
const products_module_1 = require("../products/products.module");
const cloudinary_repository_1 = require("./cloudinary.repository");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            products_module_1.ProductModule,
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product])
        ],
        providers: [files_service_1.FilesService, cloudinary_1.cloudinaryConfig, cloudinary_repository_1.CloudinaryRepository],
        controllers: [files_controller_1.FilesController],
        exports: [files_service_1.FilesService, cloudinary_repository_1.CloudinaryRepository],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map