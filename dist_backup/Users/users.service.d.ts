import { UserRepository } from "./users.repository";
import { CreateUserDto } from "../Dto/CreateUserDto";
import { UpdateUserDto } from "../Dto/Update-userDto";
import { UserDto } from "../Dto/UserDto";
import { User } from "./users.entity";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getUsers(page: number, limit: number): Promise<UserDto[]>;
    getUserById(id: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
    deleteUser(id: string): Promise<void>;
}
