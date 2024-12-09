import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Electrónica',
    })
    @IsString({ message: 'El nombre debe ser un texto.' })
    @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres.' })
    name: string;
}
