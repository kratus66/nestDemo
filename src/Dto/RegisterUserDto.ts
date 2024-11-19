import { IsString, IsEmail, MinLength, Matches, IsNumber } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  confirmPassword: string;

  // Otros campos opcionales, como `phone`, `country`, etc.
  @IsString()
  address?: string;

  @IsNumber()
  phone:number;

  @IsString()
  city?: string;

  @IsString()
  country?: string;
}
