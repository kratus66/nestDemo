import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryRepository {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteImage(publicId: string): Promise<{
        result: string;
    }>;
}
