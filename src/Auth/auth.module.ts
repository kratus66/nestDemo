import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/Users/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET , // Llave secreta de JWT
      signOptions: { expiresIn: '1h' }, // Tiempo de expiración de 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

