import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../Category/category.module';
import { ProductRepository } from './product.repository';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoryModule, AuthModule],
    providers: [ProductService,ProductRepository],
    controllers: [ProductController],
    exports: [ProductService, ProductRepository],
})
export class ProductModule {}

