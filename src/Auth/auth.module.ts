import { Module } from "@nestjs/common";
import { AuthService } from "../Users/auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "../Users/users.repository";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/Users/users.entity";
import { AuthGuard } from "./auth.guard";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(), // ✅ Carga las variables de entorno
        TypeOrmModule.forFeature([User]),  
        JwtModule.register({
            secret: process.env.JWT_SECRET,  // ✅ Se asegura de que usa el mismo JWT_SECRET del .env
            signOptions: { expiresIn: '1h' },  
        }),
    ],
    providers: [AuthService, UserRepository, AuthGuard],
    controllers: [AuthController],
    exports: [JwtModule, AuthService, AuthGuard],
})
export class AuthModule {}


