import { Module } from "@nestjs/common";
import { AuthService } from "./authService";
import { authController } from "./authController";


@Module({
    imports:[],
    controllers:[authController],
    providers:[AuthService],
})

export class authModule{}