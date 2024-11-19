import { IsString, Length } from "class-validator";



export class CategoryDto {
    

    @IsString()
    @Length(2,20)
    name: string;

    @IsString()
    @Length(2,50)
    products: string;
}