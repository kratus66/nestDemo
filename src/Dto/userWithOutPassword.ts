import { IsString, IsEmail, Length } from 'class-validator';

export class UserWithOutPassword {
    @IsString()
    @Length(2, 50)
    name: string;

    @IsEmail()
    email: string;

    /* @IsString()
    @Length(6, 20)
    password: string; */
}