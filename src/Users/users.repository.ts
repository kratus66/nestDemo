import { Injectable } from "@nestjs/common";

import {User} from "../Interfaces/User";
import { UserDto } from "./users.service";


@Injectable()
export class UserRepository{
    
    private users = [
        {
            id: 1,
            name: "Diego Herrera",
            email: "diego@gmail.com",
            password: "password123",
            address: "123 Calle Principal",
            phone: "555-1234",
            country: "Colombia",
            city: "Bogotá"
        },
        {
            id: 2,
            name: "Maria Rojas",
            email: "maria@gmail.com",
            password: "maria456",
            address: "456 Calle Secundaria",
            phone: "555-5678",
            country: "Colombia",
            city: "Medellín"
        },
        {
            id: 3,
            name: "Juan Herrera",
            email: "juan@gmail.com",
            password: "juan789",
            address: "789 Calle Tercera",
            phone: "555-9012",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 4,
            name: "Luis Pérez",
            email: "luisp@gmail.com",
            password: "luisP321",
            address: "321 Avenida Central",
            phone: "555-3456",
            country: "México",
            city: "Ciudad de México"
        },
        {
            id: 5,
            name: "Ana Gómez",
            email: "ana@gmail.com",
            password: "anaG123",
            address: "654 Calle Cuarta",
            phone: "555-7890",
            country: "España",
            city: "Madrid"
        }
    ];
    
    findId(id: number): User | null {
        const user = this.users.find(user => user.id === id);
        if (user) {
            const { password, ...userOutPassword } = user;
            return userOutPassword as User;
        }
        return null;
    }

    getUser(page:number,limit:number): UserDto[] {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return this.users
        .slice(startIndex, endIndex)
        .map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }

    createUserRepository(user: User): User {
        const newId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
        const newUser = { id: newId, ...user };
        this.users.push(newUser);
        return newUser;
    }

    updateUserRepository(id: number, updateUser: User): User | null {
        let updatedUserResult: User | null = null;
        this.users = this.users.map(user => {
            if (user.id === id) {
                updatedUserResult = { ...user, ...updateUser };
                return updatedUserResult;
            }
            return user;
        });
        return updatedUserResult;
    }

    deleteUser(id: number): void {
        this.users = this.users.filter(user => user.id !== id);
    }
    findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
    

}