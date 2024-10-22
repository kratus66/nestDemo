import { Module } from "@nestjs/common";
import { AuthService } from "./authService";
import { AuthController } from "./authController";


@Module({
    imports:[],
    controllers:[AuthController],
    providers:[AuthService],
})

export class authModule{}