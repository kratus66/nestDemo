import { CloudinaryRepository } from './cloudinary.repository';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
export declare class FilesService {
    private readonly cloudinaryRepository;
    private readonly productRepository;
    constructor(cloudinaryRepository: CloudinaryRepository, productRepository: Repository<Product>);
    uploadAndUpdateImage(productId: string, file: Express.Multer.File): Promise<{
        url: string;
    }>;
    deleteFile(publicId: string): Promise<{
        result: string;
    }>;
}
