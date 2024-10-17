import { Controller,Get } from "@nestjs/common";
import { UsersService } from "./usersService";

@Controller("users")
export class userController{
    constructor(private readonly usersService: UsersService){}
    
}