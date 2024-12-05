// src/config/cloudinary.repository.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryRepository {
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads', // Cambia el folder si necesitas otra ubicación
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) {
                        return reject(error); // Rechaza la promesa si hay un error
                    }
                    if (!result) {
                        return reject(new Error('Upload result is undefined')); // Maneja el caso de un resultado undefined
                    }
                    resolve(result as UploadApiResponse); // Asegura que el resultado no sea undefined
                },
            ).end(file.buffer);
        });
    }

    async deleteImage(publicId: string): Promise<{ result: string }> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    return reject(error); // Rechaza la promesa si hay un error
                }
                if (!result) {
                    return reject(new Error('Delete result is undefined')); // Maneja el caso de un resultado undefined
                }
                resolve(result as { result: string }); // Asegura que el resultado no sea undefined
            });
        });
    }
}


