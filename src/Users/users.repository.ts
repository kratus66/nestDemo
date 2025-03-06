import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { Role } from "src/Users/constants/roles.enum";
import * as bcrypt from 'bcrypt';

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
        const user = await this.userRepo.findOne({
            where: { id },
            relations: ["orders"],
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
    
        return user; // ✅ No devuelve `role`
    }
    
    async findByEmail(email: string): Promise<User | null> { 
        const user = await this.userRepo.findOne({ where: { email } });

        if (!user) {
            console.log("Usuario no encontrado en la base de datos.");
            return null;
        }

        console.log("Usuario encontrado:", user);
        return user;
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const email = userData.email;
    
        const existingUser = await this.userRepo.findOneBy({ email });
    
        if (existingUser) {
            throw new ConflictException(`Usuario registrado`);
        }
    
        const newUser = this.userRepo.create({
            ...userData,
            role: (Object.values(Role).includes(userData.role as Role) ? userData.role : Role.USER) as Role, // ✅ Se asegura de que role sea del tipo Role
        });
    
        return await this.userRepo.save(newUser); // ✅ Asegurar que retorna un User válido
    }
    

    async updateUser(id: string, updateUser: Partial<User>): Promise<User | null> {
        await this.userRepo.update(id, updateUser);
        return this.findByIdWithOrders(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
}
