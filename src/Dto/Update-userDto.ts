import { IsOptional, IsString, IsEmail, IsPhoneNumber, Length } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(2, 50)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Length(6, 20)
    password?: string;

    @IsOptional()
    @IsPhoneNumber(null)
    phone?: number;

    @IsOptional()
    @IsString()
    @Length(2, 50)
    country?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    @Length(2, 50)
    city?: string;
}
