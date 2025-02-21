import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsOptional, IsNumber,Matches} from 'class-validator';

export class CreateUserDto {
  
    @IsString()
    @Length(2,50)
    @ApiProperty({
        description:'el nombre debe de ser minimo de dos caracteres',
        example:"Diego Herrera"
    })
    name:string;

    @IsEmail()
    @Length(3,80)
    @ApiProperty({
        description:'el email debe de ser valido',
        example:"diegoherrera@hotmail.com"
    })
    email: string;

    @IsString()
    @Length(8, 15, {
        message: 'La contraseña debe tener entre 8 y 15 caracteres',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)',
    })
    @ApiProperty({
        description:'la contraseña debe de tener minimo un letra mayúscula, mínimo un minúscula, un caracter especial y un numero, debe tener entre 8 a 15 caracteres',
        example:"Diego123*"
    })
    password: string;

    @IsNumber()
    @ApiProperty({
        description:'el numero debe de ser entero',
        example:3125864588
    })
    phone: number;

    @IsString()
    @Length(5,20)
    country: string;

    @IsString()
    @Length(3,80)
    address: string|null;

    @IsString()
    @Length(5,20)
    city: string|null;

   
}
