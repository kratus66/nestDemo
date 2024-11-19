import { Body, Controller, HttpStatus, Post,Res } from "@nestjs/common";
import { UserRepository } from "src/Users/users.repository";
import { Response } from "express";
import { AuthService } from "src/Users/auth.service";
import { UsersService } from "src/Users/users.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){

    }

    @Post('signin')
    async signin(
        @Body('email') email:string,
        @Body('password') password:string,
        @Res() res:Response
    ){
        if(!email || ! password){
            return res.status(HttpStatus.BAD_REQUEST).json({
                messaje:"Email o password no ingresados"
            })
        }
        const isValidUser = await this.authService.validateUser(email,password)
            if(!isValidUser){
            return res.status(HttpStatus.UNAUTHORIZED).json({
                messaje:"Email o password invalidos",
            })
            
        }
        const token = await this.authService.generateJwtToken(isValidUser);
        return res.status(HttpStatus.OK).json({ token });
    }



}

