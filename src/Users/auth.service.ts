import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './users.entity';
import { RegisterUserDto } from 'src/Dto/RegisterUserDto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    // Iniciar sesión y generar token JWT
    async signIn(email: string, password: string): Promise<{ success: string; token: string }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h',
        });

        return { success: 'User logged in successfully', token };
    }

    // Registrar un nuevo usuario
    async signup(registerUserDto: RegisterUserDto): Promise<Omit<User, 'password'>> {
        const { password, ...userData } = registerUserDto;

        // Guardamos el nuevo usuario con la contraseña en texto plano
        const newUser = await this.userRepository.createUser({
            ...userData,
            password,
        });

        // Excluimos la contraseña de la respuesta
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    // Validar usuario (auxiliar para guardas o decoradores)
    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || user.password !== password) {
            return null;
        }
        return user;
    }

    // Generar token JWT (auxiliar)
    async generateJwtToken(user: User): Promise<string> {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h',
        });
    }
}
