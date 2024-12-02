import { UserRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './users.entity';
import { RegisterUserDto } from 'src/Dto/RegisterUserDto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        success: string;
        token: string;
    }>;
    validateUser(email: string, password: string): Promise<User | null>;
    generateJwtToken(user: User): Promise<string>;
    signup(registerUserDto: RegisterUserDto): Promise<User>;
}
