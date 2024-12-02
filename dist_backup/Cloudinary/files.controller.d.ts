import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        url: string;
    }>;
    deleteFile(publicId: string): Promise<{
        result: string;
    }>;
}
