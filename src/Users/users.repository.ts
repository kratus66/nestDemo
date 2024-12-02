import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { Role } from "../constants/roles.enum";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async getUsers(page: number, limit: number): Promise<User[]> {
        const skip = (page - 1) * limit;
        return this.userRepo.find({
            skip,
            take: limit,
        });
    }

    async findByIdWithOrders(id: string): Promise<User> {
        // Buscar el usuario por ID e incluir las órdenes con solo los campos necesarios
        const user = await this.userRepo.findOne({
            where: { id },
            relations: ["orders"], // Cargar las órdenes relacionadas
            select: {
                id: true,
                name: true,
                email: true,
                orders: {
                    id: true,
                    date: true,
                },
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async findByEmail(email: string): Promise<User | null> { 
        return this.userRepo.findOne({ where: { email } });
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const newUser = this.userRepo.create({...userData,role:Role.USER});
        return this.userRepo.save(newUser);
    }

    async updateUser(id: string, updateUser: Partial<User>): Promise<User | null> {
        await this.userRepo.update(id, updateUser);
        return this.findByIdWithOrders(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
}

