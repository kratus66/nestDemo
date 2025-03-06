import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsNumber,
  IsOptional,
  IsEnum
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {Role} from '../Users/constants/roles.enum';

export class RegisterUserDto {
  @IsString()
  @ApiProperty({
    description: 'El nombre debe de ser mínimo de dos caracteres',
    example: 'Diego Herrera',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'El email debe de ser válido',
    example: 'diegoherrera@hotmail.com',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'La contraseña debe de contener mayúsculas, minúsculas, números y un carácter especial',
    example: 'Diego123*',
  })
  password: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  @ApiProperty({
    description: 'Confirmación de contraseña',
    example: 'Diego123*',
  })
  confirmPassword?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Dirección',
    example: 'Mz B Casa 12 Barrio El Triangulo',
  })
  address?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Número de celular',
    example: 987654321,
  })
  phone?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Ciudad',
    example: 'Puerto Carreño',
  })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'País',
    example: 'Vichada',
  })
  country?: string;

  @IsString()
  @ApiProperty({
      description:"debe de seleccionar un rol",
      example:"user o admin"
  })
  role: Role

 
}

