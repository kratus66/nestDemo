import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async signIn(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res() res: Response
    ) {
        // Verificamos que ambas credenciales estén presentes
        if (!email || !password) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Email and password are required.',
            });
        }

        // Llamamos al servicio de autenticación
        const result = await this.authService.signIn(email, password);

        if (!result) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Email or password incorrect',
            });
        }

        // Si todo es correcto
        return res.status(HttpStatus.OK).json({
            message: 'Login successful',
        });
    }
}

