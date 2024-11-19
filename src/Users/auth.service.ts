import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../Dto/RegisterUserDto';
import { User } from './users.entity';
import { UsersService } from './users.service';

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
    
        console.log("Contraseña ingresada:", password); // Contraseña en texto plano ingresada
        console.log("Contraseña en base de datos:", user.password); // Contraseña hasheada en la base de datos
        
        // Comparar la contraseña en texto plano con el hash almacenado
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        console.log("¿Las contraseñas coinciden?", isPasswordMatching);
        
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }
        
        // Si las contraseñas coinciden, generar y devolver el token
        const userPayload = {
            sub: user.id,
            email: user.email,
        };
    
        const token = this.jwtService.sign(userPayload, { expiresIn: '1h' });
    
        return { success: 'User logged in successfully', token };
    }

   

    async validateUser(email:string, password:string){
        const user= await this.userRepository.findByEmail(email);
        if(!user){
            console.log("Usuario no encontrado");
            return null;
        }
        console.log("Contraseña ingresada:", password); // Contraseña en texto plano ingresada
        console.log("Contraseña en base de datos:", user.password);

       
        if(user.password !== password){
            return null;// contraseña incorrecta
        }
        return user;

    }
    // contraseña correcta y se genera el token 
    async generateJwtToken(user: any): Promise<string> {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }
}

