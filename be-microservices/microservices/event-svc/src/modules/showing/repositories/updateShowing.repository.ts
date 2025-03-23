import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateShowingDto } from '../commands/UpdateShowing/updateShowing.dto';

@Injectable()
export class UpdateShowingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateShowing(dto: UpdateShowingDto): Promise<Result<string, Error>> {
    try {
      // Check if the showing exists
      const existing = await this.prisma.showing.findUnique({
        where: { id: dto.id },
      });
      if (!existing) {
        return Err(new Error('Showing not found'));
      }

      // Build dynamic update data based on provided fields
      const updateData: any = {};
      if (dto.status) updateData.status = dto.status;
      if (dto.startTime) updateData.startTime = dto.startTime;
      if (dto.endTime) updateData.endTime = dto.endTime;

      const showing = await this.prisma.showing.update({
        where: { id: dto.id },
        data: updateData,
      });

      if (showing) {
        return Ok(showing.id);
      }
      return Err(new Error('Failed to update showing'));
    } catch (error) {
      return Err(new Error('Failed to update showing'));
    }
  }
}