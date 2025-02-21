import { Body, Controller, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/Users/auth.service';
import { RegisterUserDto } from 'src/Dto/RegisterUserDto';
import { LoginUserDto } from 'src/Dto/LoginUserDto';
import { RolesGuard } from 'src/guard/rolesGuard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from './auth.guard';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/constants/roles.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({
    description: 'Cuerpo necesario para iniciar sesión',
    type: LoginUserDto,
  })
  @ApiResponse({ status: 200, description: 'Usuario autenticado con éxito' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async signin(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
        const response = await this.authService.signIn(loginUserDto.email, loginUserDto.password);
        return res.status(HttpStatus.OK).json(response);
    } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Email o password inválidos' });
    }
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ description: 'Cuerpo necesario para registrar un nuevo usuario', type: RegisterUserDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado con éxito' })
  @ApiResponse({ status: 400, description: 'Contraseñas no coinciden o solicitud inválida' })
  async signup(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
    if (registerUserDto.password !== registerUserDto.confirmPassword) {
        throw new HttpException('Las contraseñas deben ser iguales', HttpStatus.BAD_REQUEST);
    }

    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
    const userWithoutPassword = await this.authService.signup(registerUserDto);
    return res.status(HttpStatus.CREATED).json(userWithoutPassword);
}


  @Post('protected-endpoint')
  @ApiOperation({ summary: 'Endpoint protegido solo para administradores' })
  
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Acceso concedido' })
  @ApiResponse({ status: 403, description: 'Acceso denegado por rol insuficiente' })
  protectedEndpoint(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({ message: 'Access granted to protected endpoint' });
  }
}
