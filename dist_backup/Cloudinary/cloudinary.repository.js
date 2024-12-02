"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryRepository = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let CloudinaryRepository = class CloudinaryRepository {
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({
                folder: 'uploads',
                resource_type: 'image',
            }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            }).end(file.buffer);
        });
    }
    async deleteImage(publicId) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(publicId, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
        });
    }
};
exports.CloudinaryRepository = CloudinaryRepository;
exports.CloudinaryRepository = CloudinaryRepository = __decorate([
    (0, common_1.Injectable)()
], CloudinaryRepository);
//# sourceMappingURL=cloudinary.repository.js.map