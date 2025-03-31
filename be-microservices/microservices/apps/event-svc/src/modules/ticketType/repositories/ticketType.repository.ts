import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import e from 'express';
import { CreateTicketTypeDto } from '../commands/createTicketType/createTicketType.dto';

@Injectable()
export class TicketTypeRepository {
  constructor(private readonly prisma: PrismaService) {} 

  async createTicketType(dto: CreateTicketTypeDto, showingId: string, imageUrl: string): Promise<Result<string, Error>> {
    try{
      if (!showingId) {
        return Err(new Error('Showing not found'));
      }
      const showing = await this.prisma.showing.findUnique({
        where: {
          id: showingId
        }
      });
      if (!showing) {
        return Err(new Error('Showing not found'));
      }
      const ticketType = await this.prisma.ticketType.create({
        data: {
          name: dto.name,
          showingId: showing.id,
          description: dto.description,
          color: dto.color,
          isFree: false,
          price: dto.originalPrice >> 0,
          originalPrice: dto.originalPrice >> 0,
          startTime: dto.startTime,
          endTime: dto.endTime,
          position: dto.position >> 0,
          quantity: dto.quantity >> 0 || 0,
          maxQtyPerOrder: dto.maxQtyPerOrder >> 0,
          minQtyPerOrder: dto.minQtyPerOrder  >> 0,
          isHidden: false,
          imageUrl: imageUrl
        }
      });
      if (ticketType) {
        return Ok(ticketType.id);
      }
      return Err(new Error('Failed to create ticket type'));
    }catch (error) {
      console.log(error);
      return Err(new Error('Failed to create ticket type'));
    }
  }

}