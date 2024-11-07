import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { cloudinaryConfig } from '../config/cloudinary';
import { Product } from '../products/product.entity';
import { ProductModule } from '../products/products.module';
import { CloudinaryRepository } from './cloudinary.repository';

@Module({
    imports: [
        ProductModule,
        TypeOrmModule.forFeature([Product]) // Asegura que Product esté disponible para TypeORM
    ],
    providers: [FilesService, cloudinaryConfig, CloudinaryRepository],
    controllers: [FilesController],
    exports: [FilesService, CloudinaryRepository],
})
export class FilesModule {}

