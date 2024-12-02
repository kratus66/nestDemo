import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File): Express.Multer.File {
        // Verificar si se recibe un archivo
        if (!file) {
            throw new BadRequestException('No se recibió ningún archivo.');
        }

        // Validar el tamaño del archivo (200 KB = 200 * 1024 bytes)
        const maxFileSize = 100 * 1024; // 200 KB
        if (file.size > maxFileSize) {
            throw new BadRequestException('El tamaño de la imagen no debe superar los 200 KB.');
        }

        // Validar el tipo de archivo permitido
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('Solo se permiten imágenes en formato JPEG, PNG o GIF.');
        }

        return file; // Retornar el archivo si cumple con las validaciones
    }
}
