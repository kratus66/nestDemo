import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  Res,
  Query,
  UseGuards,
  HttpException,
  ParseUUIDPipe,
  Req
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";
import { AuthGuard } from "../Auth/auth.guard";
import { CreateUserDto } from "../Dto/CreateUserDto";
import { UpdateUserDto } from "../Dto/Update-userDto";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../constants/roles.enum";
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller("users")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener lista de usuarios' })
  async getUsers(
      @Res() res: Response,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 5
  ) {
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  async getUserProfile(@Req() request: any, @Res() res: Response) {
      try {
          const user = request.user;
          if (!user) {
              throw new HttpException('Usuario no autenticado', HttpStatus.UNAUTHORIZED);
          }

          const userProfile = await this.usersService.getUserById(user.sub);
          if (!userProfile) {
              throw new HttpException('Perfil no encontrado', HttpStatus.NOT_FOUND);
          }

          const { password, ...userWithoutPassword } = userProfile;
          return res.status(HttpStatus.OK).json(userWithoutPassword);
      } catch (error) {
          throw new HttpException(
              error.message || 'Error al obtener el perfil del usuario',
              HttpStatus.INTERNAL_SERVER_ERROR
          );
      }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  async getUserById(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Res() res: Response
  ) {
      try {
          const user = await this.usersService.getUserById(id);
          if (!user) {
              throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
          }

          const { password, ...userWithoutPassword } = user;
          return res.status(HttpStatus.OK).json(userWithoutPassword);
      } catch (error) {
          throw new HttpException(
              error.message || 'Error al obtener el usuario',
              HttpStatus.INTERNAL_SERVER_ERROR
          );
      }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  async createUser(
      @Body() createUserDto: CreateUserDto,
      @Res() res: Response
  ) {
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar información de un usuario' })
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  async deleteUser(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Res() res: Response
  ) {
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
