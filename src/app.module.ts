import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './Users/user.module';
import { ProductModule } from './Products/products.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/typeorm";
import { CategoryModule } from './Category/category.module';
import { FilesModule } from './Cloudinary/files.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from './Order/order.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeOrmConfig],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const typeOrmConfig = configService.get<TypeOrmModuleOptions>("typeorm");
                if (!typeOrmConfig) {
                    throw new Error("TypeORM configuration is missing");
                }
                return typeOrmConfig;
            },
        }),
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
})
export class AppModule {
    constructor() {
        // Imprime la variable de entorno para verificar
        console.log(`DB_HOST: ${process.env.DB_HOST}`);
    }
}
