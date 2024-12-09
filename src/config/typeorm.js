import { DataSource } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";
import { User } from "../Users/users.entity";
import { Order } from "../Order/order.entity";
import { OrderDetails } from "../Order/orderDetails.entity";
import { Product } from "../Products/product.entity";
import { Category } from "../Category/category.entity";

dotenvConfig({ path: ".env" });

console.log(`Database: ${process.env.DB_NAME}`);

export const config = {
  type: "postgres",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    __dirname + "/../Users/*.entity{.ts,.js}",
    __dirname + "/../Order/*.entity{.ts,.js}",
    __dirname + "/../Products/*.entity{.ts,.js}",
    __dirname + "/../Category/*.entity{.ts,.js}",
  ],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: false, // Se desactiva para evitar conflictos en producción
  logging: true,
};

export default registerAs("typeorm", () => config);

export const connectionSource = new DataSource(config);

