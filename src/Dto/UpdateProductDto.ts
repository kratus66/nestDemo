import { IsString, IsOptional, IsNumber, IsUUID, Length, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
    @IsOptional()
    @IsUUID("4", { message: "El ID debe ser un UUID válido" })
    @ApiProperty({
        description: "ID único del producto",
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    id?: string;

    @IsOptional()
    @IsString({ message: "El nombre debe ser un texto" })
    @Length(3, 50, { message: "El nombre debe tener entre 3 y 50 caracteres" })
    @ApiProperty({
        description: "Nombre del producto",
        example: "Teclado mecánico",
    })
    name?: string;

    @IsOptional()
    @IsString({ message: "La descripción debe ser un texto" })
    @Length(10, 500, { message: "La descripción debe tener entre 10 y 500 caracteres" })
    @ApiProperty({
        description: "Descripción del producto",
        example: "Teclado mecánico con retroiluminación RGB",
    })
    description?: string;

    @IsOptional()
    @IsNumber({}, { message: "El precio debe ser un número" })
    @Min(0, { message: "El precio no puede ser negativo" })
    @ApiProperty({
        description: "Precio del producto",
        example: 129.99,
    })
    price?: number;

    @IsOptional()
    @IsNumber({}, { message: "El stock debe ser un número entero" })
    @Min(0, { message: "El stock no puede ser negativo" })
    @ApiProperty({
        description: "Cantidad de stock disponible",
        example: 100,
    })
    stock?: number;

    @IsOptional()
    @IsString({ message: "La URL de la imagen debe ser un texto válido" })
    @ApiProperty({
        description: "URL de la imagen del producto",
        example: "https://example.com/image.jpg",
    })
    imgUrl?: string;

    @IsOptional()
    @IsString({ message: "La categoría debe ser un texto" })
    @Length(3, 50, { message: "La categoría debe tener entre 3 y 50 caracteres" })
    @ApiProperty({
        description: "Nombre de la categoría del producto",
        example: "Electrónica",
    })
    category?: string;
}
