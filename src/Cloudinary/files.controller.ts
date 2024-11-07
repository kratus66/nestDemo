// src/files/files.controller.ts
import { Controller, Post, Delete, UploadedFile, Param, UseInterceptors, HttpException, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    // Endpoint para subir una imagen y actualizar la URL en la base de datos del producto
    @Post('uploadImage/:id')
@UseInterceptors(FileInterceptor('file'))
async uploadImage(
    @Param('id') id: string, // Remueve ParseUUIDPipe si no usas UUIDs
    @UploadedFile() file: Express.Multer.File,
) {
    if (!file) {
        throw new HttpException('Archivo no recibido', HttpStatus.BAD_REQUEST);
    }
    return await this.filesService.uploadAndUpdateImage(id, file);
}

    // Endpoint para eliminar una imagen de Cloudinary
    @Delete(':publicId')
    async deleteFile(@Param('publicId') publicId: string) {
        return await this.filesService.deleteFile(publicId);
    }
}

