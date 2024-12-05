import { IsUUID, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class ProductDto {
    @ApiProperty({
        description: "ID del producto",
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    @IsUUID()
    @IsNotEmpty({ message: "El id del producto es requerido y debe tener un formato UUID válido." })
    id: string;
}

export class CreateOrderDto {
    @ApiProperty({
        description: "ID del usuario que realiza la orden",
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    @IsUUID()
    @IsNotEmpty({ message: "El userId es requerido y debe tener un formato UUID válido." })
    userId: string;

    @ApiProperty({
        description: "Array de productos incluidos en la orden",
        type: [ProductDto],
    })
    @IsArray({ message: "Los productos deben ser un array." })
    @ValidateNested({ each: true })
    @Type(() => ProductDto) // Indica que los objetos en el array son de tipo ProductDto
    products: ProductDto[];
}
