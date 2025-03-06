import { Injectable, UnauthorizedException, HttpException,HttpStatus } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './users.entity';
import { RegisterUserDto } from 'src/Dto/RegisterUserDto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/Users/constants/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ success: string; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
    });

    return { success: 'User logged in successfully', token };
  }

  async signup(registerUserDto: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const { password, role, ...userData } = registerUserDto;

    // Si el rol es "admin", verificar que el usuario autenticado sea administrador
    if (role === Role.ADMIN) {
        throw new HttpException(
            'Solo los administradores pueden crear otros administradores',
            HttpStatus.FORBIDDEN,
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({
        ...userData,
        password: hashedPassword,
        role: role,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}



  async generateJwtToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }
}
