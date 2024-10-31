import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService, CategoryRepository],
    controllers: [CategoryController],
    exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
