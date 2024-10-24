import { Injectable } from '@nestjs/common';
import { UserRepository } from '../Users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async signIn(email: string, password: string): Promise<boolean> {
        const user = this.userRepository.findByEmail(email);
      
        if (!user) {
          console.log('Usuario no encontrado');
          return false;
        }
      
        // Comparar las contraseñas directamente en texto plano (si no usas bcrypt)
        if (password !== user.password) {
          console.log('Contraseña incorrecta');
          return false;
        }
      
        return true;
      }
}

