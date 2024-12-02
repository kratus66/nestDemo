import { PipeTransform } from '@nestjs/common';
export declare class ImageValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File): Express.Multer.File;
}
