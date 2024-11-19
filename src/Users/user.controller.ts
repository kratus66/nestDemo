  import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpCode, Res, Query, UseGuards, HttpException, ParseUUIDPipe, Req } from "@nestjs/common";
  import { UsersService } from "./users.service";
  import { Response } from "express";
  import { AuthGuard } from "src/Auth/auth.guard";
  import { CreateUserDto } from "../Dto/CreateUserDto";
  import { UpdateUserDto } from "../Dto/Update-userDto";

  @Controller("users")
  export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getUsers(@Res() res: Response, @Query('page') page: number = 1, @Query('limit') limit: number = 5) {
      try {
        const users = await this.usersService.getUsers(page, limit);
        return res.status(HttpStatus.OK).json(users);
      } catch (error) {
        throw new HttpException(
          error.message || 'Error al obtener los usuarios',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
    @Get('profile')
    @UseGuards(AuthGuard)
    getUserProfile(/*@Headers*/@Req() request: Request){
      
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getUserById(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
      try {
        const user = await this.usersService.getUserById(id);
        if (!user) {
          throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return res.status(HttpStatus.OK).json(user);
      } catch (error) {
        throw new HttpException(
          error.message || 'Error al obtener el usuario',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
      try {
        const newUser = await this.usersService.createUser(createUserDto);
        return res.status(HttpStatus.CREATED).json({ id: newUser.id });
      } catch (error) {
        throw new HttpException(
          error.message || 'Error al crear el usuario',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateUser(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() updateUserDto: UpdateUserDto,
      @Res() res: Response
    ) {
      try {
        const updatedUser = await this.usersService.updateUser(id, updateUserDto);
        if (!updatedUser) {
          throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return res.status(HttpStatus.OK).json({ id: updatedUser.id });
      } catch (error) {
        throw new HttpException(
          error.message || 'Error al actualizar el usuario',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
      try {
        await this.usersService.deleteUser(id);
        return res.status(HttpStatus.OK).json({ message: `Usuario con ID ${id} eliminado correctamente` });
      } catch (error) {
        throw new HttpException(
          error.message || 'Error al eliminar el usuario',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }


