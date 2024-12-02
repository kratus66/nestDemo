import { Repository } from "typeorm";
import { User } from "./users.entity";
export declare class UserRepository {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    getUsers(page: number, limit: number): Promise<User[]>;
    findByIdWithOrders(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
    updateUser(id: string, updateUser: Partial<User>): Promise<User | null>;
    deleteUser(id: string): Promise<void>;
}
