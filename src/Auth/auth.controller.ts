import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../Dto/LoginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginUserDto: LoginUserDto): Promise<{ message: string }> {
    const isAuthenticated = await this.authService.signIn(loginUserDto.email, loginUserDto.password);

    if (!isAuthenticated) {
      throw new Error('Credenciales incorrectas');
    }

    return { message: 'Inicio de sesión exitoso' };
  }
}

