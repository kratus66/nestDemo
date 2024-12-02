import { UsersService } from "./users.service";
import { Response } from "express";
import { CreateUserDto } from "../Dto/CreateUserDto";
import { UpdateUserDto } from "../Dto/Update-userDto";
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(res: Response, page?: number, limit?: number): Promise<Response<any, Record<string, any>>>;
    getUserProfile(request: Request): void;
    getUserById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createUser(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(id: string, updateUserDto: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
