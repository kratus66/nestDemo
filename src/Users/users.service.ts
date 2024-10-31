import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { UserDto } from "./user.dto";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUsers(page: number, limit: number): Promise<UserDto[]> {
        return this.userRepository.getUsers(page, limit);
    }

    async getUserById(id: string): Promise<User> {
        return this.userRepository.findByIdWithOrders(id);
    }

    async createUser(user: User): Promise<User> {
        return this.userRepository.createUser(user);
    }

    async updateUser(id: string, user: Partial<User>): Promise<User | null> {
        return this.userRepository.updateUser(id, user);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.deleteUser(id);
    }
}

