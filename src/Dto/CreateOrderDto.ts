import { IsUUID,IsNotEmpty,IsArray,ValidateNested} from "class-validator";
import { Type } from 'class-transformer';

import { Order } from "src/Order/order.entity";


export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty({ message: 'El userId es requerido y debe tener un formato UUID válido.' })
    userId: string;
  
    @IsArray({ message: 'Los productos deben ser un array.' })
    @IsNotEmpty({ each: true, message: 'El array de productos debe contener al menos un producto.' })
    @ValidateNested({ each: true })
    @Type(() => Order) // Necesario para la validación y transformación de objetos anidados
    products: Partial<Order>[];
  }