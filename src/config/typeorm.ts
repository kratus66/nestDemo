import "reflect-metadata"; 
import  {DataSource}  from 'typeorm'; // ✅ Importación correcta
import { User } from '../Users/users.entity';
import { Order } from '../Order/order.entity';
import { Product } from '../Products/product.entity';
import { Category } from '../Category/category.entity';
import { OrderDetails } from '../Order/orderDetails.entity';
import * as path from 'path';
import dotenv from 'dotenv'; // ✅ Importación correcta de dotenv

// Cargar variables de entorno
dotenv.config();
console.log("DB Config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  db: process.env.DB_NAME,
});


  export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Colombia123',
  database: process.env.DB_NAME || 'demo-db',
  entities: [User, Order, Product, Category, OrderDetails],
  migrations: [__dirname + "/../migrations/*.{ts,js}"],

  synchronize: false,
  logging: true,

});









