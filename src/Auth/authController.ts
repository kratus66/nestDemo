import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./authService"; 

@Controller("auth")

export class AuthController{
    constructor(private readonly authService: AuthService){}
    @Get()
    getAuth(){
        return this.authService.getAuth();
    }
}
