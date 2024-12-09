import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../Products/product.entity';
import {Multer} from 'multer';

@Injectable()
export class FilesService {
    constructor(
        private readonly cloudinaryRepository: CloudinaryRepository,
        @InjectRepository(Product) // Inyectamos el repositorio de Product
        private readonly productRepository: Repository<Product>,
    ) {}

    // Subir y actualizar la imagen de un producto en Cloudinary
    async uploadAndUpdateImage(productId: string, file: Express.Multer.File): Promise<{ url: string }> {
        console.log(`Uploading image for product ID: ${productId}`);
        
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            console.error(`Product not found for ID: ${productId}`);
            throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
        }
    
        console.log('Uploading file to Cloudinary...');
        const uploadResult = await this.cloudinaryRepository.uploadImage(file);
    
        if ('secure_url' in uploadResult) {
            console.log('File uploaded successfully:', uploadResult.secure_url);
            product.imgUrl = uploadResult.secure_url;
            await this.productRepository.save(product);
            return { url: product.imgUrl };
        } else {
            console.error('Error uploading file:', uploadResult);
            throw new HttpException('Error al cargar la imagen en Cloudinary', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Eliminar una imagen de Cloudinary por publicId
    async deleteFile(publicId: string): Promise<{ result: string }> {
        try {
            const deleteResult = await this.cloudinaryRepository.deleteImage(publicId);
            if (deleteResult.result !== 'ok') {
                throw new NotFoundException(
                    `La imagen con publicId ${publicId} no se encontró.`,
                );
            }
            return deleteResult;
        } catch (error) {
            if (error instanceof HttpException) {
                // Si el error es una instancia de HttpException, la lanzamos de nuevo
                throw error;
            }
            // Manejamos otros tipos de errores como genéricos
            throw new HttpException(
                (error as Error).message || 'Error al eliminar el archivo',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

