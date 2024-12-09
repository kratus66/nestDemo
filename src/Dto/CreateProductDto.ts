import { IsString, IsNumber, IsUUID, IsOptional, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'Nombre del producto', example: 'Laptop Dell XPS 13' })
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({ description: 'Descripción del producto', example: 'Ultrabook de alto rendimiento' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Precio del producto', example: 1200.99 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Stock disponible', example: 10 })
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty({ description: 'URL de la imagen del producto', example: 'https://example.com/laptop.jpg' })
    @IsOptional()
    @IsString()
    imgUrl?: string;

    @ApiProperty({ description: 'Nombre de la categoría', example: 'Electrónica' })
    @IsString()
    category: string;
}
