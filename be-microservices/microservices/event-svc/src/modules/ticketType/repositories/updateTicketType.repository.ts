import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateTicketTypeDto } from '../commands/updateTicketType/updateTicketType.dto';

@Injectable()
export class UpdateTicketTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateTicketType(dto: UpdateTicketTypeDto, imageUrl?: string): Promise<Result<string, Error>> {
    try {
      // Verify ticket type exists
      const existing = await this.prisma.ticketType.findUnique({
        where: { id: dto.id },
      });
      if (!existing) {
        return Err(new Error('Ticket type not found'));
      }

      // Build update data dynamically
      const updateData: any = {};
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.color !== undefined) updateData.color = dto.color;
      if (dto.isFree !== undefined) updateData.isFree = dto.isFree;
      if (dto.originalPrice !== undefined) {
        updateData.originalPrice = dto.originalPrice;
        updateData.price = dto.originalPrice; // update price to match originalPrice
      }
      if (dto.startTime !== undefined) updateData.startTime = dto.startTime;
      if (dto.endTime !== undefined) updateData.endTime = dto.endTime;
      if (dto.position !== undefined) updateData.position = dto.position;
      if (dto.quantity !== undefined) updateData.quantity = dto.quantity;
      if (dto.maxQtyPerOrder !== undefined) updateData.maxQtyPerOrder = dto.maxQtyPerOrder;
      if (dto.minQtyPerOrder !== undefined) updateData.minQtyPerOrder = dto.minQtyPerOrder;
      if (dto.isHidden !== undefined) updateData.isHidden = dto.isHidden;
      if (imageUrl) updateData.imageUrl = imageUrl;

      const ticketType = await this.prisma.ticketType.update({
        where: { id: dto.id },
        data: updateData,
      });

      if (ticketType) {
        return Ok(ticketType.id);
      }
      return Err(new Error('Failed to update ticket type'));
    } catch (error) {
      return Err(new Error('Failed to update ticket type'));
    }
  }
}