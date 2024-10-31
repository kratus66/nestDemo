import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { UserDto } from "./user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    // Obtener usuarios con paginación
    async getUsers(page: number, limit: number): Promise<UserDto[]> {
        const [users] = await this.userRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            select: ["id", "name", "email", "address", "phone", "country", "city"],
        });
        return users;
    }

    // Obtener usuario por ID incluyendo órdenes
    async findByIdWithOrders(userId: string): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ["orders"],
            select: {
                id: true,
                name: true,
                email: true,
                address: true,
                phone: true,
                country: true,
                city: true,
                orders: {
                    id: true,
                    date: true,
                },
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return user;
    }

    // Crear usuario
    async createUser(user: User): Promise<User> {
        const newUser = this.userRepo.create(user);
        return await this.userRepo.save(newUser);
    }

    // Actualizar usuario
    async updateUser(id: string, updateUser: Partial<User>): Promise<User | null> {
        await this.userRepo.update(id, updateUser);
        return this.findByIdWithOrders(id);
    }

    // Eliminar usuario
    async deleteUser(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
    async findByEmail(email: string): Promise<User | undefined> {
        return await this.userRepo.findOne({ where: { email } });
    }
}
