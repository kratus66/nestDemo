import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UserRepository],
    controllers: [UserController],
    exports: [UserRepository], // Exporta el UserRepository para que pueda ser usado en otros módulos
})
export class UserModule {}




