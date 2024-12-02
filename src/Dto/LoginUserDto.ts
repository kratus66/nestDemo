import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @ApiProperty({
    description:'email',
    example:"diegoherrera@hotmail.com"
})
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @ApiProperty({
    description:'password',
    example:"Diego123*"
})
  password: string;
}