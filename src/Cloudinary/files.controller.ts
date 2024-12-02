import { Controller, Post, Delete, UploadedFile, Param, UseInterceptors, HttpException, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/auth.guard';
import { ImageValidationPipe } from './image-validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @UseGuards(AuthGuard) // Proteger el endpoint con AuthGuard
    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param('id', ParseUUIDPipe) id: string, // ParseUUIDPipe si los IDs son UUIDs
        @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
    ) {
        if (!file) {
            throw new HttpException('Archivo no recibido', HttpStatus.BAD_REQUEST);
        }
        return await this.filesService.uploadAndUpdateImage(id, file);
    }

    @Delete(':publicId')
    async deleteFile(@Param('publicId') publicId: string) {
        return await this.filesService.deleteFile(publicId);
    }
}

