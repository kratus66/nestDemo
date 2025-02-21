import { IsUUID, IsNotEmpty, IsArray, ValidateNested, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class ProductOrderDto {
    @ApiProperty({
        description: "ID del producto",
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    @IsUUID()
    @IsNotEmpty({ message: "El id del producto es requerido y debe tener un formato UUID válido." })
    id: string;

    @ApiProperty({
        description: "Cantidad del producto a comprar",
        example: 2,
    })
    @IsInt()
    @Min(1, { message: "La cantidad debe ser al menos 1." })
    quantity: number;
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
        description: "Array de productos incluidos en la orden con cantidad",
        type: [ProductOrderDto],
    })
    @IsArray({ message: "Los productos deben ser un array." })
    @ValidateNested({ each: true })
    @Type(() => ProductOrderDto)
    products: ProductOrderDto[];
}