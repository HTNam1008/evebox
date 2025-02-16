import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { CreateTicketTypeDto } from '../commands/tickettype/create-tickettype.dto';
import { Prisma } from "@prisma/client";

@Injectable()
export class TicketTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTicketTypeDto) {
    return this.prisma.ticketType.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        color: data.color,
        isFree: data.isFree,
        price: data.price,
        originalPrice: data.originalPrice,
        maxQtyPerOrder: data.maxQtyPerOrder,
        minQtyPerOrder: data.minQtyPerOrder,
        effectiveFrom: data.effectiveFrom,
        effectiveTo: data.effectiveTo,
        position: data.position,
        status: data.status,
        imageUrl: data.imageUrl,
        isHidden: data.isHidden ?? false,
        Showing: {
          connect: { id: data.showingId },
        },
      }      
    });
  }

  async getAllTicketType() {
    return this.prisma.ticketType.findMany();
  }

  async findTicketTypeById(id: string) {
    return this.prisma.ticketType.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.TicketTypeUpdateInput) {
    return this.prisma.ticketType.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.ticketType.delete({ where: { id } });
  }
}