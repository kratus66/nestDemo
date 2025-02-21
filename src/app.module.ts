import "reflect-metadata"
import { Module} from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './Users/user.module';
import { ProductModule } from './Products/products.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeederService } from "./data/seeder.service";
import { CategoryModule } from './Category/category.module';
import { FilesModule } from './Cloudinary/files.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from './Order/order.module';
import {AppDataSource} from './config/typeorm';
import { Category } from "./Category/category.entity";
import { Product } from "./Products/product.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            
        }),
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([Category, Product]),

       
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        OrderModule,
        UserModule,
        ProductModule,
        CategoryModule,
        FilesModule,
    ],
    providers: [SeederService],
})
export class AppModule {
    constructor() {
        // Imprime la variable de entorno para verificar
        console.log(`DB_HOST: ${process.env.DB_HOST}`);
    }
}
