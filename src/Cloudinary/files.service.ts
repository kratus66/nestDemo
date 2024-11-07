import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';

@Injectable()
export class FilesService {
    constructor(
        private readonly cloudinaryRepository: CloudinaryRepository,
        @InjectRepository(Product) // Inyectamos el repositorio de Product
        private readonly productRepository: Repository<Product>,
    ) {}

    // Subir y actualizar la imagen de un producto en Cloudinary
    async uploadAndUpdateImage(productId: string, file: Express.Multer.File): Promise<{ url: string }> {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
        }

        const uploadResult = await this.cloudinaryRepository.uploadImage(file);
        if ('secure_url' in uploadResult) {
            product.imgUrl = uploadResult.secure_url;
            await this.productRepository.save(product); // Guardamos el cambio en la imagen

            return { url: product.imgUrl };
        } else {
            throw new HttpException('Error al cargar la imagen en Cloudinary', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Eliminar una imagen de Cloudinary por publicId
    async deleteFile(publicId: string): Promise<{ result: string }> {
        try {
            return await this.cloudinaryRepository.deleteImage(publicId);
        } catch (error) {
            throw new HttpException('Error al eliminar el archivo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


