import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { ItemType } from '../commands/add-to-favorite/create-favorite.dto';

@Injectable()
export class FavoriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(userId: string, itemType: ItemType, itemId: string): Promise<void> {
    const data: any = {
      userId,
      itemType,
      isFavorite: true,
      isNotified: false,
    };
  
    if (itemType === ItemType.EVENT) {
      const eventId = parseInt(itemId);
      if (isNaN(eventId)) throw new Error('Invalid event ID');
  
      const event = await this.prisma.events.findUnique({
        where: { id: eventId },
        select: { id: true },
      });
  
      if (!event) throw new Error('Event not found');
  
      data.eventId = event.id;  
      data.orgId = null;
    } 
    else if (itemType === ItemType.ORG) {
      // Try find organizer by email (for orgId)
      const organizer = await this.prisma.user.findUnique({
        where: { email: itemId },
        select: { id: true },
      });
  
      if (organizer) {
        data.orgId = itemId;
        data.eventId=null;
      }
    }
  
    await this.prisma.favorite_noti_history.create({ data });
  }

  async getUserIdByEmail(email: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return user?.id || null;
  }

  async findByUserIdAndEventId(userId: string, eventId: number) {
    return this.prisma.favorite_noti_history.findFirst({
      where: {
        userId,
        eventId,
        isFavorite: true,
      },
    });
  }

  async findFavorite(userId: string, itemType: ItemType, itemId: string) {
    if (itemType === ItemType.EVENT) {
      const eventId = parseInt(itemId);
      if (isNaN(eventId)) return null;
  
      return this.prisma.favorite_noti_history.findFirst({
        where: {
          userId,
          itemType,
          eventId,
        },
      });
    } else {
      const organizer = await this.prisma.user.findUnique({
        where: { email: itemId },
        select: { id: true },
      });
      if (!organizer) return null;
  
      return this.prisma.favorite_noti_history.findFirst({
        where: {
          userId,
          itemType,
          orgId: itemId,
        },
      });
    }
  }

  async findByUserIdAndOrgId(userId: string, orgId: string) {
    return this.prisma.favorite_noti_history.findFirst({
      where: {
        userId,
        orgId,
        isFavorite: true,
      },
    });
  }

  async updateFavoriteStatus(id: string, isFavorite: boolean): Promise<void> {
    await this.prisma.favorite_noti_history.update({
      where: { id },
      data: { isFavorite },
    });
  }
}
