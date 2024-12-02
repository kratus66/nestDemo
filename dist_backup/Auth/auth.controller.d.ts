import { Response } from "express";
import { AuthService } from "src/Users/auth.service";
import { RegisterUserDto } from "src/Dto/RegisterUserDto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(email: string, password: string, res: Response): Promise<Response<any, Record<string, any>>>;
    signup(registerUserDto: RegisterUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    protectedEndpoint(res: Response): Response<any, Record<string, any>>;
}
