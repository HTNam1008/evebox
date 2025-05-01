import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadImage(fileBuffer: Buffer, fileName: string): Promise<any>;
}
