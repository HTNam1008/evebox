import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { Request } from 'express';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(req: Request, payload: any): Promise<{
        email: any;
        role: any;
    }>;
}
export {};
