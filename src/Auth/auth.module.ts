import { Module } from "@nestjs/common";
import { AuthService } from "../Users/auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "../Users/users.repository";
import { JwtModule } from "@nestjs/jwt";

import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/Users/users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),  // Inyecta la entidad User en el UsersRepository
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'yourSecretKey',  // Define el secreto para firmar el token
            signOptions: { expiresIn: '1h' },  // Opcional: tiempo de expiración del token
        }),
    ],
    providers: [AuthService, UserRepository],
    controllers: [AuthController],
    exports: [JwtModule, AuthService],
})
export class AuthModule {}
