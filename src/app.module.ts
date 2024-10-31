import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './Users/user.module';
import { ProductModule } from './Products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/typeorm";
import { CategoryModule } from './Category/category.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load:[typeOrmConfig]
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get("typeorm"),
            
        }),
        AuthModule,
        UserModule,
        ProductModule,
        CategoryModule
    ]
})
export class AppModule {}


