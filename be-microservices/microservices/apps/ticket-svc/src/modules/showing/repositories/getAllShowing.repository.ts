import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class getAllShowingRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getAllShowing(){
    return await this.prisma.showing.findMany({select: {id: true}});
  }
}