import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { EventWeeklyRepository } from './event-weekly.repository';
import { EventFrontDisplayRepository } from '../repositories/event-frontdisplay.repository';
import axios from 'axios';

@Injectable()
export class FrontDisplayWeeklyRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FrontDisplayWeeklyRepository.name);
  private readonly eventWeeklyRepository = new EventWeeklyRepository(this.prisma);
  private readonly eventFrontDisplayRepository = new EventFrontDisplayRepository(this.prisma);

  async fetchCategories() {
    try {
      const response = await axios.get("https://api-v2.ticketbox.vn/gin/api/v2/discovery/categories");
      //this.logger.log(response.status);
      if (response.status === 200 && response.data.data.result) {
        this.logger.log("Fetched categories successfully.");
          return response.data.data.result;
      } else {
        this.logger.error("Failed to fetch categories.");
          return null;
      }
    } catch (error) {
      this.logger.error("Error fetching categories:", error.message);
      return null;
    }
  }

  async resetEventSpecialData() {
    try {
      await this.prisma.$transaction([
        this.prisma.events.updateMany({
          data: { isSpecial: false, isOnlyOnEve: false },
        }),
        this.prisma.eventCategories.updateMany({
          data: { isSpecial: false },
        }),
      ]);
      this.logger.log("Reset isSpecial and isOnlyOnEve for all events.");
    } catch (error) {
      this.logger.error("Error resetting event data:", error.message);
    }
  }
  

  async updateEventData(res: any) {
    if (!res) return;
    try {
        const { bigCates } = res;
        const specialEventIds: number[] = res.specialEvents.events.map((event: { originalId: number }) => event.originalId);
        const onlyOnTicketboxIds: number[] = res.onlyOnTicketbox.events.map((event: { originalId: number }) => event.originalId);
        const trendingEventIds: number[] = res.trendingEvents.events.map((event: { originalId: number }) => event.originalId);

        // 🛑 Bước 1: Kiểm tra sự kiện đã tồn tại (ngoài transaction để giảm tải)
        const allEventIds = [...specialEventIds, ...onlyOnTicketboxIds, ...trendingEventIds];
        let existingEvents = await this.prisma.events.findMany({
            where: { id: { in: allEventIds } },
            select: { id: true }
        });

        let existingEventIds = new Set(existingEvents.map(e => e.id));

        // 🛑 Bước 2: Tạo sự kiện nếu chưa có (không cần transaction)
        const missingEventIds = allEventIds.filter(eventId => !existingEventIds.has(eventId));
        if (missingEventIds.length > 0) {
            await Promise.all(missingEventIds.map(eventId => 
                this.eventWeeklyRepository.createOrUpdateEventDetail(eventId)
            ));
        }

        // 🛑 Bước 3: Kiểm tra lại ID sau khi tạo (ngoài transaction)
        existingEvents = await this.prisma.events.findMany({
            where: { id: { in: allEventIds } },
            select: { id: true }
        });
        existingEventIds = new Set(existingEvents.map(e => e.id));

        const validSpecialEventIds = specialEventIds.filter(id => existingEventIds.has(id));
        const validOnlyOnTicketboxIds = onlyOnTicketboxIds.filter(id => existingEventIds.has(id));
        const validTrendingEventIds = trendingEventIds.filter(id => existingEventIds.has(id));

        // 🛑 Bước 4: Cập nhật dữ liệu bằng các transaction nhỏ hơn
        if (validSpecialEventIds.length > 0) {
            await this.prisma.events.updateMany({
                where: { id: { in: validSpecialEventIds } },
                data: { isSpecial: true }
            });
            this.logger.log("Updated isSpecial for special events.");
        }

        if (validOnlyOnTicketboxIds.length > 0) {
            await this.prisma.events.updateMany({
                where: { id: { in: validOnlyOnTicketboxIds } },
                data: { isOnlyOnEve: true }
            });
            this.logger.log("Updated isOnlyOnEve for events only on Ticketbox.");
        }

        // 🛑 Bước 5: Xử lý trending events
        const trendingEventsDb = await this.eventFrontDisplayRepository.getTrendingEvents();
        const secondEvent = trendingEventsDb[1] || { lastScore: 10, weekClicks: 0 };

        if (validTrendingEventIds.length > 0) {
            await this.prisma.events.updateMany({
                where: { id: { in: validTrendingEventIds } },
                data: {
                    lastScore: secondEvent.lastScore,
                    totalClicks: secondEvent.weekClicks + Math.floor(Math.random() * 200),
                    weekClicks: secondEvent.weekClicks + Math.floor(Math.random() * 200),
                }
            });
            this.logger.log("Updated lastScore for trending events.");
        }

        // 🛑 Bước 6: Xử lý categories
        
        if (bigCates?.length) {
          let validCatesEventIds = [];
          for (const cate of bigCates) {
              validCatesEventIds = [...validCatesEventIds, ...cate.events.map((event: { originalId: number }) => event.originalId)];
          }
          existingEvents = await this.prisma.events.findMany({
            where: { id: { in: validCatesEventIds } },
            select: { id: true }
          });
          existingEventIds = new Set(existingEvents.map(e => e.id));
          const missingCatesEventIds = validCatesEventIds.filter(eventId => !existingEventIds.has(eventId));
          this.logger.log(`Missing cate event IDs: ${missingCatesEventIds}`);
          if (missingCatesEventIds.length > 0) {
              await Promise.all(missingCatesEventIds.map(eventId => 
                  this.eventWeeklyRepository.createOrUpdateEventDetail(eventId)
              ));
          }
            for (const cate of bigCates) {
                let categoryId: number;
                switch (cate.cateId) {
                    case 8: categoryId = 1; break;
                    case 12: categoryId = 5; break;
                    case 10: categoryId = 2; break;
                    default: continue;
                }
                
                const cateEveIds: number[] = cate.events.map((event: { originalId: number }) => event.originalId);
                this.logger.log(`Category ID: ${categoryId}, Event IDs: ${cateEveIds}`);
                if (cateEveIds.length > 0) {
                    await this.prisma.eventCategories.updateMany({
                        where: { eventId: { in: cateEveIds }, categoryId },
                        data: { isSpecial: true }
                    });
                    this.logger.log(`Updated isSpecial for category ID: ${categoryId}`);
                }
            }
        }

    } catch (error) {
        this.logger.error("Error updating event data:", error.message);
    }
  }
  
  async updateLastScore() {
    try {
      const events = await this.prisma.events.findMany();
      await this.prisma.$transaction(events.map(event => 
        this.prisma.events.update({
          where: { id: event.id },
          data: {
            lastScore: Math.round(event.weekClicks / 7),
            weekClicks: 0,
          },
        })
      ));
      this.logger.log("Updated lastScore for all events.");
    } catch (error) {
      this.logger.error("Error updating lastScore:", error.message);
    }
  }
  

  async updateFrontDisplayWeekly() {
    try {
      await this.resetEventSpecialData();
      this.logger.log("Fetching categories...");
      const res = await this.fetchCategories();
      if (!res) {
        this.logger.log("No data fetched. Exiting...");
        return;
      }
  
      this.logger.log("Updating event data...");
      await this.updateEventData(res);
      this.logger.log('Database updated successfully!');
    } catch (error) {
      this.logger.error("Error in main function:", error.message);
    }
  }
  
}