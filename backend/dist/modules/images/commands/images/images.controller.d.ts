import { Response } from 'express';
import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadImage(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    getImage(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateImage(id: string, file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    removeImage(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
