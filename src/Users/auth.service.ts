import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
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
    
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        // Comparar contraseña ingresada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Password entered:", password);
            console.log("Password in DB:", user.password);
            console.log("Passwords do not match");
            throw new UnauthorizedException('Invalid credentials');
        }
        console.log("Passwords match!");
    
        // Generar token JWT
        const payload = { sub: user.id, email: user.email, role:user.role};
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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Passwords do not match");
            return null;
        }
    
        console.log("Passwords match");
        return user;
    }

    // Generar token JWT (método auxiliar)
    async generateJwtToken(user: User): Promise<string> {
        const payload = { email: user.email, sub: user.id };
        console.log("Generating token with payload:", payload);
        return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
    }

    async signup(registerUserDto:RegisterUserDto){

        const {password, ...userData}= registerUserDto;

        // OJO, AQUI HASHEAMOS LA CONTASEÑA

        const hashedPassword= await bcrypt.hash(password,10);

        // ahora envio la contraseña hasheada con el resto de informacion a la base de datos para que se guarde

        const newUser= await this.userRepository.createUser({...userData,password:hashedPassword});

        // retorno el usuario sin contraseña como respuesta para indicar que todo salio bien
        return newUser;

    }

}


