import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { Images } from '../domain/entities/images.entity';
export declare class ImagesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(imageUrl: string): Promise<Images>;
    findAll(): Promise<Images[]>;
    findOne(id: number): Promise<Images | null>;
    update(id: number, imageUrl: string): Promise<Images>;
    remove(id: number): Promise<Images>;
}
