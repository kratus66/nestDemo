import { IsOptional, IsString, IsEmail, IsPhoneNumber, Length, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(2, 50)
    name?: string;

    @IsOptional()
    @IsEmail()
    @Length(3,80)
    email?: string;

    @IsOptional()
    @IsString()
    @Length(8, 15)
    password?: string;

    @IsNumber()
    phone?: number;

    @IsOptional()
    @IsString()
    @Length(2, 50)
    country?: string;

    @IsOptional()
    @IsString()
    @Length(3,80)
    address?: string;

    @IsOptional()
    @IsString()
    @Length(2, 20)
    city?: string;
}
