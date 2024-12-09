import { Controller, Post, Delete, UploadedFile, Param, UseInterceptors, HttpException, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/auth.guard';
import { ImageValidationPipe } from './image-validation.pipe';
import { ApiTags, ApiParam, ApiConsumes, ApiBody, ApiResponse,ApiOperation } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data') // Especificar que el endpoint acepta multipart/form-data
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary', // Indica que el campo es un archivo
                },
            },
        },
    })
    @ApiParam({
        name: 'id',
        description: 'El ID del producto al que se asociará la imagen',
        type: String,
    })
    async uploadImage(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
    ) {
        if (!file) {
            throw new HttpException('Archivo no recibido', HttpStatus.BAD_REQUEST);
        }
        return await this.filesService.uploadAndUpdateImage(id, file);
    }

    @Delete(':publicId')
    @ApiOperation({ summary: 'Eliminar una imagen de Cloudinary' })
    @ApiParam({
        name: 'publicId',
        description: 'ID público de la imagen en Cloudinary',
        type: String,
        example: 'sample_public_id',
    })
    @ApiResponse({
        status: 200,
        description: 'La imagen fue eliminada exitosamente.',
    })
    @ApiResponse({
        status: 404,
        description: 'La imagen no se encontró en Cloudinary.',
    })
    @ApiResponse({
        status: 500,
        description: 'Error interno del servidor al intentar eliminar la imagen.',
    })
    async deleteFile(@Param('publicId') publicId: string) {
        try {
            const result = await this.filesService.deleteFile(publicId);
            return { message: 'Imagen eliminada exitosamente', result };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; // Lanzamos excepciones de NestJS directamente
            }
            throw new HttpException(
                (error as Error).message || 'Error al eliminar el archivo',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

