import { Injectable } from "@nestjs/common";


@Injectable()
export class UserRepository{
    
    private users = [
        {
            id: 1,
            name: "Diego Herrera",
            email: "diego@gmail.com",
            password: "password123",
            address: "123 Calle Principal",
            phone: "555-1234",
            country: "Colombia",
            city: "Bogotá"
        },
        {
            id: 2,
            name: "Maria Rojas",
            email: "maria@gmail.com",
            password: "maria456",
            address: "456 Calle Secundaria",
            phone: "555-5678",
            country: "Colombia",
            city: "Medellín"
        },
        {
            id: 3,
            name: "Juan Herrera",
            email: "juan@gmail.com",
            password: "juan789",
            address: "789 Calle Tercera",
            phone: "555-9012",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 4,
            name: "Luis Pérez",
            email: "luisp@gmail.com",
            password: "luisP321",
            address: "321 Avenida Central",
            phone: "555-3456",
            country: "México",
            city: "Ciudad de México"
        },
        {
            id: 5,
            name: "Ana Gómez",
            email: "ana@gmail.com",
            password: "anaG123",
            address: "654 Calle Cuarta",
            phone: "555-7890",
            country: "España",
            city: "Madrid"
        }
    ];
    

    async getUser(){
        return this.users;
    }
}