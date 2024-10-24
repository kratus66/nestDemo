import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "../Interfaces/User";

export interface UserDto {
    id:number,
    name: string,
    email: string,
    
    address: string,
    phone: string,
    country: string,
    city: string
}

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) {}

    async getUsers(page:number, limit:number): Promise<UserDto[]> {
        return this.userRepository.getUser(page,limit);
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findId(id);
    }

    async createUser(user: User): Promise<User> {
        return this.userRepository.createUserRepository(user);
    }

    async updateUser(id: number, user: User): Promise<User | null> {
        return this.userRepository.updateUserRepository(id, user);
    }

    async deleteUser(id: number): Promise<User | null> {
        const user = await this.userRepository.findId(id);
        if (user) {
            this.userRepository.deleteUser(id);
            return user; // Retorna el usuario eliminado
        }
        return null;
    }
}
