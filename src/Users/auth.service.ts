import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './users.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService   
    ) {}

    // Iniciar sesión y generar token JWT
    async signIn(email: string, password: string): Promise<{ success: string; token: string }> {
        const user = await this.userRepository.findByEmail(email);
    
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        // Comparar contraseña ingresada con la almacenada
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        // Generar token JWT
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
    
        return { success: 'User logged in successfully', token };
    }

    // Validar usuario y contraseña (método auxiliar)
    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            console.log("User not found");
            return null;
        }

        console.log("Password entered:", password);
        console.log("Password in DB:", user.password);

        // Comparar contraseñas utilizando bcrypt
        if (user.password !== password) {
            console.log("Passwords do not match");
            return null;
        }

        return user;
    }

    // Generar token JWT (método auxiliar)
    async generateJwtToken(user: User): Promise<string> {
        const payload = { email: user.email, sub: user.id };
        console.log("Generating token with payload:", payload);
        return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
    }
}


