"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let ImageValidationPipe = class ImageValidationPipe {
    transform(file) {
        if (!file) {
            throw new common_1.BadRequestException('No se recibió ningún archivo.');
        }
        const maxFileSize = 100 * 1024;
        if (file.size > maxFileSize) {
            throw new common_1.BadRequestException('El tamaño de la imagen no debe superar los 200 KB.');
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Solo se permiten imágenes en formato JPEG, PNG o GIF.');
        }
        return file;
    }
};
exports.ImageValidationPipe = ImageValidationPipe;
exports.ImageValidationPipe = ImageValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ImageValidationPipe);
//# sourceMappingURL=image-validation.pipe.js.map