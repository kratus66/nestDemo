import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UserController { // Cambié a PascalCase para seguir las convenciones de NestJS
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }
}
