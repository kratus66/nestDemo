import { Body, Controller, HttpException, HttpStatus, Post, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from 'src/Users/auth.service';
import { RegisterUserDto } from 'src/Dto/RegisterUserDto';
import { LoginUserDto } from 'src/Dto/LoginUserDto';
import { RolesGuard } from 'src/guard/rolesGuard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from './auth.guard';
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/Users/constants/roles.enum';
import { User } from 'src/Users/users.entity';
import { RequestWithUser } from 'src/Interfaces/requestWithUser.interface'; // Importamos la nueva interfaz
import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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
  @ApiResponse({ status: 403, description: 'No tienes permisos para crear un administrador' })
  @ApiBearerAuth('JWT-auth')
  async signup(@Body() registerUserDto: RegisterUserDto, @Req() req: Request, @Res() res: Response) {
    
    // Si el rol es "admin", verificar autenticación
    if (registerUserDto.role === Role.ADMIN) {
      const authHeader = req.headers['authorization'] as string; // Type assertion
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new HttpException(
          'Authorization header must start with "Bearer "',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = authHeader.replace('Bearer ', '').trim();
      try {
        const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        if (payload.role !== Role.ADMIN) {
          throw new HttpException(
            'Solo los administradores pueden crear otros administradores',
            HttpStatus.FORBIDDEN,
          );
        }
      } catch (error) {
        throw new HttpException(
          'Invalid or expired token',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    // Hashea la contraseña y crea el usuario
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
    const userWithoutPassword = await this.authService.signup(registerUserDto);
    return res.status(HttpStatus.CREATED).json(userWithoutPassword);
  }
  @Post('protected-endpoint')
  @ApiOperation({ summary: 'Endpoint protegido solo para administradores' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN) // Solo los administradores pueden acceder
  @ApiResponse({ status: 200, description: 'Acceso concedido' })
  @ApiResponse({ status: 403, description: 'Acceso denegado por rol insuficiente' })
  protectedEndpoint(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({ message: 'Access granted to protected endpoint' });
  }
}