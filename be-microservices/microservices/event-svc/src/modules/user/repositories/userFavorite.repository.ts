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
        data.orgId = organizer.id;
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
}
