import { Body, Controller, HttpException, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "src/Users/auth.service";
import { RegisterUserDto } from "src/Dto/RegisterUserDto";
import { LoginUserDto } from "src/Dto/LoginUserDto"; // DTO para login
import { RolesGuard } from "src/guard/rolesGuard";
import { Roles } from "src/decorators/roles.decorator";
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

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
    async signin(
        @Body() loginUserDto: LoginUserDto,
        @Res() res: Response
    ) {
        const { email, password } = loginUserDto;
        if (!email || !password) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email o password no ingresados"
            });
        }

        const isValidUser = await this.authService.validateUser(email, password);
        if (!isValidUser) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: "Email o password invalidos",
            });
        }

        const token = await this.authService.generateJwtToken(isValidUser);
        return res.status(HttpStatus.OK).json({ token });
    }

    @Post('signup')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiBody({
        description: 'Cuerpo necesario para registrar un nuevo usuario',
        type: RegisterUserDto,
    })
    @ApiResponse({ status: 201, description: 'Usuario registrado con éxito' })
    @ApiResponse({ status: 400, description: 'Contraseñas no coinciden o solicitud inválida' })
    async signup(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
        const { password, confirmPassword } = registerUserDto;

        if (password !== confirmPassword) {
            throw new HttpException("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        const user = await this.authService.signup(registerUserDto);
        const { password: _, ...userWithoutPassword } = user;
        return res.status(HttpStatus.CREATED).json(userWithoutPassword);
    }

    @Post('protected-endpoint')
    @ApiOperation({ summary: 'Endpoint protegido solo para administradores' })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @ApiResponse({ status: 200, description: 'Acceso concedido' })
    @ApiResponse({ status: 403, description: 'Acceso denegado por rol insuficiente' })
    protectedEndpoint(@Res() res: Response) {
        return res.status(HttpStatus.OK).json({
            message: "Access granted to protected endpoint",
        });
    }
}
