import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpCode, Res, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";
import { AuthGuard } from "src/Auth/auth.guard";
import {User} from "./users.entity";

@Controller("users")
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getUsers(@Res() res: Response, @Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        const users = await this.usersService.getUsers(page, limit);
        return res.status(HttpStatus.OK).json(users);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getUserById(@Param('id') id: string, @Res() res: Response) {
        try {
            const user = await this.usersService.getUserById(id);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() user: User, @Res() res: Response) {
        const newUser = await this.usersService.createUser(user);
        return res.status(HttpStatus.CREATED).json({ id: newUser.id });
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateUser(@Param('id') id: string, @Body() user: Partial<User>, @Res() res: Response) {
        try {
            const updatedUser = await this.usersService.updateUser(id, user);
            return res.status(HttpStatus.OK).json({ id: updatedUser?.id });
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.usersService.deleteUser(id);
            return res.status(HttpStatus.OK).json({ message: `User with ID ${id} deleted successfully` });
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
    }
}

