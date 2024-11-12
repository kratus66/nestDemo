import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../Dto/LoginUserDto';
import { RegisterUserDto } from '../Dto/RegisterUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginUserDto: LoginUserDto): Promise<{ message: string; token: string }> {
    try {
      const authResponse = await this.authService.signIn(loginUserDto.email, loginUserDto.password);
      return { message: authResponse.success, token: authResponse.token };
    } catch (error) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }

  @Post('signup')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    if (registerUserDto.password !== registerUserDto.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const user = await this.authService.signUp(registerUserDto);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

