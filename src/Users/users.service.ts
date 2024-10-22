import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(
        private userRepository: UserRepository,
        @Inject("API_USERS") private apiUsers: { id: number; name: string; email: string }[], // Cambié el tipo de `any` a `User`
    ) {}

    async getUsers(): Promise<{ id: number; name: string; email: string }[]> {
        const dbUser = await this.userRepository.getUser();
        const users = [...dbUser, ...this.apiUsers];
        return users;
    }
}
