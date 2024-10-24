import { Injectable } from "@nestjs/common";
import { Product } from "src/Interfaces/Product";


@Injectable()
export class ProductRepository{
    private products = [
        {
            id: 1,
            name: "Monitor Curvo",
            description: "Monitor Samsung Curvo 27 Fhd Diseño Sin Bordes LC27R500 Dark blue gray 100V/240V",
            price: 150.99,
            stock: true,
            imgUrl: "https://example.com/monitor.jpg"
        },
        {
            id: 2,
            name: "Tecno Spark Go",
            description: "Tecno Spark Go (2024) Dual SIM 128 GB negro 4 GB RAM",
            price: 120.00,
            stock: true,
            imgUrl: "https://example.com/spark-go.jpg"
        },
        {
            id: 3,
            name: "Laptop HP Pavilion",
            description: "HP Pavilion 15 Laptop, 11th Gen Intel Core i7, 16GB RAM, 512GB SSD",
            price: 899.99,
            stock: true,
            imgUrl: "https://example.com/laptop-hp.jpg"
        },
        {
            id: 4,
            name: "Teclado Mecánico RGB",
            description: "Teclado Mecánico RGB para Gaming con Switches Blue, retroiluminación LED",
            price: 49.99,
            stock: false,
            imgUrl: "https://example.com/teclado-rgb.jpg"
        },
        {
            id: 5,
            name: "Audífonos Bluetooth",
            description: "Audífonos Inalámbricos Bluetooth con cancelación de ruido y batería de 30 horas",
            price: 79.99,
            stock: true,
            imgUrl: "https://example.com/audifonos.jpg"
        }
    ];
    
    getProducts(page:number,limit:number): Product[] {

        const startIndex=(page-1)*limit;
        const endIndex=startIndex + limit;

        return this.products.slice(startIndex,endIndex);
    }

    // Obtener un producto por su ID
    getProductById(id: number): Product | null {
        const product = this.products.find(product => product.id === id);
        return product || null;
    }

    // Crear un nuevo producto
    createProduct(newProduct: Omit<Product, 'id'>): Product {
        const newId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        const productWithId = { id: newId, ...newProduct };
        this.products.push(productWithId);
        return productWithId;
    }

    // Actualizar un producto existente
    updateProduct(id: number, updateProduct: Partial<Product>): Product | null {
        let updatedProduct: Product | null = null;
        this.products = this.products.map(product => {
            if (product.id === id) {
                updatedProduct = { ...product, ...updateProduct };
                return updatedProduct;
            }
            return product;
        });
        return updatedProduct;
    }

    // Eliminar un producto por su ID
    deleteProduct(id: number): void {
        this.products = this.products.filter(product => product.id !== id);
    }
}