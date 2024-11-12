import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../Users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../Dto/RegisterUserDto';
import { User } from '../Users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService   
    ) {}

    async signIn(email: string, password: string): Promise<{ success: string; token: string }> {
        const user = await this.userRepository.findByEmail(email);
    
        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }
    
        // Compara la contraseña hasheada
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }
    
        const userPayload = {
            sub: user.id,
            email: user.email,
        };
    
        const token = this.jwtService.sign(userPayload, { expiresIn: '1h' });
    
        return { success: 'User logged in successfully', token };
    }   

    async signUp(registerUserDto: RegisterUserDto): Promise<User> {
        const { name, email, password, ...optionalFields } = registerUserDto;
    
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException('El correo electrónico ya está registrado');
        }
    
        // Asegúrate de que la contraseña esté hasheada aquí
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await this.userRepository.createUser({
            name,
            email,
            password: hashedPassword, // Contraseña hasheada almacenada
            ...optionalFields,
        });
    
        return newUser;
    }
}
