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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_repository_1 = require("./cloudinary.repository");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../products/product.entity");
let FilesService = class FilesService {
    constructor(cloudinaryRepository, productRepository) {
        this.cloudinaryRepository = cloudinaryRepository;
        this.productRepository = productRepository;
    }
    async uploadAndUpdateImage(productId, file) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new common_1.NotFoundException(`Producto con ID ${productId} no encontrado`);
        }
        const uploadResult = await this.cloudinaryRepository.uploadImage(file);
        if ('secure_url' in uploadResult) {
            product.imgUrl = uploadResult.secure_url;
            await this.productRepository.save(product);
            return { url: product.imgUrl };
        }
        else {
            throw new common_1.HttpException('Error al cargar la imagen en Cloudinary', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteFile(publicId) {
        try {
            return await this.cloudinaryRepository.deleteImage(publicId);
        }
        catch (error) {
            throw new common_1.HttpException('Error al eliminar el archivo', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [cloudinary_repository_1.CloudinaryRepository,
        typeorm_2.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map