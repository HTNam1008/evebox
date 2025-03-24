import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateShowingDto } from '../commands/UpdateShowing/updateShowing.dto';

@Injectable()
export class UpdateShowingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateShowing(dto: UpdateShowingDto, id: string): Promise<Result<string, Error>> {
    try {
      // Check if the showing exists
      const existing = await this.prisma.showing.findUnique({
        where: { id },
        select: {
          startTime: true,
          endTime: true,
        }
      });
      if (!existing) {
        return Err(new Error('Showing not found'));
      }
      console.log(dto);
      // Build dynamic update data based on provided fields
      const updateData: any = {};
      if (dto.status) updateData.status = dto.status;
      if (dto.startTime) updateData.startTime = dto.startTime;
      if (dto.endTime) updateData.endTime = dto.endTime;

      const startTimeValid = dto.startTime || existing.startTime;
      const endTimeValid = dto.endTime || existing.endTime;
      if (startTimeValid && endTimeValid && new Date(startTimeValid) > new Date(endTimeValid)) {
        return Err(new Error('Showing startTime must be before endTime'));
      }

      const showing = await this.prisma.showing.update({
        where: { id },
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