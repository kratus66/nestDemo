import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";
import { User } from '../Users/users.entity';
import { Order } from '../Order/order.entity';
import { OrderDetails } from '../Order/orderDetails.entity';
import { Product } from '../Products/product.entity';
import { Category } from '../Category/category.entity';

dotenvConfig({ path: ".env.development" }); // Cargar variables desde el archivo .env
console.log(`Database: ${process.env.DB_NAME}`);

const config: DataSourceOptions = {
    type: "postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [User, Order, OrderDetails, Product, Category],
    migrations: ["dist/migrations/*{.ts,.js}"],
    synchronize: false, // Mantén en false para evitar cambios automáticos en la base de datos en producción
    logging: true,
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config);

