import { DataSource } from 'typeorm';
import { User } from '../Users/users.entity';
import { Order } from '../Order/order.entity';
import { Product } from '../Products/product.entity';
import { Category } from '../Category/category.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'didakus66',
  database: process.env.DB_NAME || 'demo-db',
  entities: [User, Order, Product, Category],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});

export default AppDataSource; // Solo exporta esto.
