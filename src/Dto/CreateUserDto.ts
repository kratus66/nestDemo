import { IsString, IsEmail, Length, IsOptional, IsNumber,Matches} from 'class-validator';

export class CreateUserDto {
  
    @IsString()
    @Length(2,50)
    name:string;

    @IsEmail()
    @Length(3,80)
    email: string;

    @IsString()
    @Length(8, 15, {
        message: 'La contraseña debe tener entre 8 y 15 caracteres',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)',
    })
    password: string;

    @IsString()
    @Length(2,25)
    phone: string;

    @IsString()
    @Length(5,20)
    country: string;

    @IsString()
    @Length(3,80)
    address: string;

    @IsString()
    @Length(5,20)
    city: string;
}
