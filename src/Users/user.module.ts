import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UserController } from './user.controller';

@Module({
    providers: [UsersService, UserRepository],
    controllers: [UserController],
    exports: [UserRepository], // Exporta el UserRepository para que pueda ser usado en otros módulos
})
export class UserModule {}




