import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
export declare class LocationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        street: string;
        ward: string;
        provinceId: number;
        districtId: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }[]>;
    findById(id: number): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
    update(id: number, data: Partial<{
        street: string;
        ward: string;
        districtId: number;
    }>): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
}
