import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../Category/category.entity';
import { Product } from '../Products/product.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.seedCategories();
    await this.seedProducts();
  }

  async seedCategories() {
    const filePath = path.join(__dirname, '../data/categories.json');
    const categoriesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    for (const categoryData of categoriesData) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: categoryData.name },
      });

      if (!existingCategory) {
        const newCategory = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(newCategory);
        this.logger.log(`Categoría agregada: ${categoryData.name}`);
      }
    }
  }

  async seedProducts() {
    const filePath = path.join(__dirname, '../data/products.json');
    const productsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    for (const productData of productsData) {
      const existingProduct = await this.productRepository.findOne({
        where: { name: productData.name },
      });

      if (!existingProduct) {
        const category = await this.categoryRepository.findOne({
          where: { name: productData.category },
        });

        if (!category) {
          this.logger.warn(`Categoría no encontrada para el producto: ${productData.name}`);
          continue;
        }

        const newProduct = this.productRepository.create({
          ...productData,
          category, // Asignamos la categoría encontrada
        });

        await this.productRepository.save(newProduct);
        this.logger.log(`Producto agregado: ${productData.name}`);
      }
    }
  }
}

