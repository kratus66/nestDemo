import { Module } from "@nestjs/common";
import { UsersService } from "./usersService";
import { userController } from "./userController";


@Module({
    imports:[],
    controllers:[userController],
    providers:[UsersService],
})

export class userModule{}
