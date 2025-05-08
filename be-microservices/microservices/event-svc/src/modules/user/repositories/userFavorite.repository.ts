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

  async getFavoriteEvents(userId: string) {
    return this.prisma.favorite_noti_history.findMany({
      where: {
        userId,
        isFavorite: true,
        itemType: 'EVENT',
      },
      select: {
        event: {
          select: {
            id: true,
            title: true,
            Images_Events_imgLogoIdToImages: {
              select: { id: true, imageUrl: true },
            },
            Images_Events_imgPosterIdToImages: {
              select: { id: true, imageUrl: true },
            },
            venue: true,
            },
          },
        },
    });
  }

  async getFavoriteOrgs(userId: string) {
    return this.prisma.favorite_noti_history.findMany({
      where: {
        userId,
        isFavorite: true,
        itemType: 'ORG',
      },
      select: {
        orgId: true,
      },
    });
  }

  async turnOnNotification(userId: string, itemType: ItemType, itemId: string): Promise<void> {
    const where: any = {
      userId,
      itemType,
    };
  
    if (itemType === ItemType.EVENT) {
      const eventId = parseInt(itemId);
      if (isNaN(eventId)) throw new Error('Invalid event ID');
      where.eventId = eventId;
    } else if (itemType === ItemType.ORG) {
      const organizer = await this.prisma.user.findUnique({
        where: { email: itemId },
        select: { id: true },
      });
      if (!organizer) throw new Error('Organizer not found');
      where.orgId = itemId;
    }
  
    const existing = await this.prisma.favorite_noti_history.findFirst({ where });
  
    if (!existing) throw new Error('Favorite record not found');
  
    await this.prisma.favorite_noti_history.update({
      where: { id: existing.id },
      data: { isNotified: true },
    });
  }

  async turnOffNotificationForEvent(userId: string, eventId: string): Promise<void> {
    const eventIdNum = parseInt(eventId);
    if (isNaN(eventIdNum)) throw new Error('Invalid event ID');
  
    const existing = await this.prisma.favorite_noti_history.findFirst({
      where: {
        userId,
        itemType: 'EVENT',
        eventId: eventIdNum,
      },
    });
  
    if (!existing) throw new Error('Favorite event not found');
  
    await this.prisma.favorite_noti_history.update({
      where: { id: existing.id },
      data: { isNotified: false },
    });
  }

  async turnOffNotificationForOrg(userId: string, orgId: string): Promise<void> { 
    const existing = await this.prisma.favorite_noti_history.findFirst({
      where: {
        userId,
        itemType: 'ORG',
        orgId: orgId,
      },
    });
  
    if (!existing) throw new Error('Favorite org not found');
  
    await this.prisma.favorite_noti_history.update({
      where: { id: existing.id },
      data: { isNotified: false },
    });
  }

  async updateReceiveNoti(userId: string, receive: boolean): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { receiveNoti: receive },
    });
  }

  async getReceiveNotiByEmail(email: string): Promise<boolean | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { receiveNoti: true },
    });
    return user?.receiveNoti ?? null;
  }
}
