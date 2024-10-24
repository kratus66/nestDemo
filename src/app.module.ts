import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module'; // Importa el AuthModule
import { UserModule } from './Users/user.module'; // Importa el UserModule si es necesario
import { ProductModule } from './Products/products.module';

@Module({
    imports: [AuthModule, UserModule,ProductModule], // Asegúrate de que el AuthModule esté en la lista de imports
})
export class AppModule {}

