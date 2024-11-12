import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

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

  @IsString()
  phone:string;

  @IsString()
  city?: string;

  @IsString()
  country?: string;
}
