import { CloudinaryService } from '../../../../infrastructure/adapters/cloudinary/cloudinary.service';
import { ImagesRepository } from '../../repositories/images.repository';
import { Result } from 'oxide.ts';
import { Images } from '../../domain/entities/images.entity';
export declare class ImagesService {
    private readonly imagesRepository;
    private readonly cloudinaryService;
    constructor(imagesRepository: ImagesRepository, cloudinaryService: CloudinaryService);
    uploadImage(fileBuffer: Buffer, fileName: string): Promise<Result<Images, Error>>;
    findAll(): Promise<Result<Images[], Error>>;
    findOne(id: number): Promise<Result<Images, Error>>;
    update(id: number, fileBuffer: Buffer, fileName: string): Promise<Result<Images, Error>>;
    remove(id: number): Promise<Result<void, Error>>;
}
