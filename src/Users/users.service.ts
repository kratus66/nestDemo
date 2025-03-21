import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { CreateUserDto } from "../Dto/CreateUserDto";
import { UpdateUserDto } from "../Dto/Update-userDto";
import {UserDto} from "../Dto/UserDto"
import { User } from "./users.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUsers(page: number, limit: number): Promise<UserDto[]> {
        return this.userRepository.getUsers(page, limit);
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.findByIdWithOrders(id);
        if (!user) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return user;
    }
    

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // Crear una nueva instancia de la entidad User y asignar propiedades desde el DTO
        const newUser = new User();
       /*  newUser.name = createUserDto.name;
        newUser.email = createUserDto.email;
        newUser.password = createUserDto.password; // Asegúrate de manejar el hashing en algún lugar si es necesario
        newUser.phone = createUserDto.phone ?? 0;// Si el campo es opcional
        newUser.country = createUserDto.country ?? 'Desconocido';
        newUser.address = createUserDto.address || undefined;
        newUser.city = createUserDto.city || undefined; */

        return this.userRepository.createUser(newUser);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        // Convertir el DTO en una entidad User parcial
        const updateUser = { ...updateUserDto } as Partial<User>;
        return this.userRepository.updateUser(id, updateUser);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.deleteUser(id);
    }
}
