import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./users.repository";
import fetch from 'node-fetch'; // Importa node-fetch

interface User {
    id: number;
    name: string;
    email: string;
}

@Module({
    imports: [],
    controllers: [UserController], // Cambié a PascalCase para seguir las convenciones de NestJS
    providers: [
        UsersService, // UsersService es necesario porque el controlador lo usa
        UserRepository,
        {
            provide: "API_USERS",
            useFactory: async (): Promise<User[]> => {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");

                // Usa una aserción de tipo para decirle a TypeScript que es un array de User
                const data = await response.json() as User[];

                return data.map((user) => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                });
            },
        },
    ],
})
export class UserModule {}



