import { IsString, IsEmail, MinLength, Matches, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsString()
  @ApiProperty({
    description:'el nombre debe de ser minimo de dos caracteres',
    example:"Diego Herrera"
})
  name: string;

  @IsEmail()
  @ApiProperty({
    description:'el email debe de ser valido',
    example:"diegoherrera@hotmail.com"
})
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    description:'La contraseña debe de contener mayusculas, minisculas, numeros y un caracter',
    example:"Diego123*"
})
  password: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  @ApiProperty({
    description:'La contraseña debe de contener mayusculas, minisculas, numeros y un caracter',
    example:"Diego123*"
})
  confirmPassword?: string;

  // Otros campos opcionales, como `phone`, `country`, etc.
  @IsString()
  @IsOptional()
  @ApiProperty({
    description:'direccion',
    example:"mz b casa 12 barrio el triangulo"
})
  address?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description:'celular',
    example:1234567890
})
  phone?:number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description:'ciudad',
    example:"puerto carreño"
})
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description:'vichada',
    example:"vichada"
})
  country?: string;
}
