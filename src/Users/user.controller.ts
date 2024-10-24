import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpCode, Res, Query,UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express"; 
import { User } from "src/Interfaces/User";
import { AuthGuard } from "src/Auth/auth.guard";



@Controller("users")
export class UserController {
    constructor(private readonly usersService: UsersService) {}
    @UseGuards(AuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK) // 200
    async getUsers(@Res() res: Response, @Query('page') page:number=1,@Query('limit') limit:number=5) {
        const users = await this.usersService.getUsers(page,limit);
        return res.status(HttpStatus.OK).json(users);
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    @HttpCode(HttpStatus.OK) // 200
    async getUserById(@Param('id') id: string, @Res() res: Response) {
        const user = await this.usersService.getUserById(Number(id));
        if (user) {
            return res.status(HttpStatus.OK).json(user);
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: `User with ID ${id} not found` });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // 201
    async createUser(@Body() user: User, @Res() res: Response) {
        const newUser = await this.usersService.createUser(user);
        return res.status(HttpStatus.CREATED).json({ id: newUser.id });
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK) // 200
    async updateUser(@Param('id') id: string, @Body() user: User, @Res() res: Response) {
        const updatedUser = await this.usersService.updateUser(Number(id), user);
        if (updatedUser) {
            return res.status(HttpStatus.OK).json({ id: updatedUser.id });
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: `User with ID ${id} not found` });
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK) // 200
    async deleteUser(@Param('id') id: string, @Res() res: Response) {
        const deletedUser = await this.usersService.deleteUser(Number(id));
        if (deletedUser) {
            return res.status(HttpStatus.OK).json({ id: deletedUser.id });
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: `User with ID ${id} not found` });
    }
}
