import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class UpdateWeeklyService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(UpdateWeeklyService.name);

  // Tự động chạy vào thứ 2 đầu tuần
  @Cron('0 0 * * 1') 
  async handleMondayJob() {
    this.logger.log('Running database update task on Monday...');
    // Gọi logic cập nhật database
    await this.updateDatabase();
    await this.updateLastScore();
  }

  async updateDatabase() {
    try {
      this.resetEventData();
      this.logger.log("Fetching categories...");
      const res = await this.fetchCategories();
      if (!res) {
        this.logger.log("No data fetched. Exiting...");
          return;
      }

      this.logger.log("Updating event data...");
      await this.updateEventData(res);
    } catch (error) {
      this.logger.error("Error in main function:", error.message);
    }
    this.logger.log('Database updated successfully!');
  }

  async resetEventData() {
    try {
      // Reset `isSpecial` và `isOnlyOnEve` về false cho tất cả sự kiện
      await this.prisma.events.updateMany({
          data: {
              isSpecial: false,
              isOnlyOnEve: false,
          },
      });
      this.logger.log("Reset isSpecial and isOnlyOnEve for all events.");
      // Reset `isSpecial` về false cho tất cả `EventCategories`
      await this.prisma.eventCategories.updateMany({
          data: {
              isSpecial: false,
          },
      });
      this.logger.log("Reset isSpecial for all EventCategories.");
    } catch (error) {
      this.logger.error("Error resetting event data:", error.message);
    }
  }
  
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
  
  async updateEventData(res) {
    if (!res) return;
  
    try {
        const { bigCates } = res;
        const specialEventIds = res.specialEvents.events.map(event => event.id);
        const onlyOnTicketboxIds = res.onlyOnTicketbox.events.map(event => event.id);
        const trendingEventIds = res.trendingEvents.events.map(event => event.id);
  
        // Cập nhật `isSpecial` thành true cho các sự kiện trong `specialEvents`
        if (specialEventIds.length > 0) {
            await this.prisma.events.updateMany({
                where: {
                    id: { in: specialEventIds },
                },
                data: {
                    isSpecial: true,
                },
            });
            this.logger.log("Updated isSpecial for special events.");
        }
  
        // Cập nhật `isOnlyOnEve` thành true cho các sự kiện trong `onlyOnTicketbox`
        if (onlyOnTicketboxIds.length > 0) {
            await this.prisma.events.updateMany({
                where: {
                    id: { in: onlyOnTicketboxIds },
                },
                data: {
                    isOnlyOnEve: true,
                },
            });
            this.logger.log("Updated isOnlyOnEve for events only on Ticketbox.");
        }
  
        // // Cập nhật `lastScore` thành 10 cho các sự kiện trong `trendingEvents`
        // if (trendingEventIds.length > 0) {
        //     await prisma.events.updateMany({
        //         where: {
        //             id: { in: trendingEventIds },
        //         },
        //         data: {
        //             lastScore: 10,
        //         },
        //     });
        //     this.logger.log("Updated lastScore for trending events.");
        // }
        // Cập nhật `isSpecial` trong `EventCategories` dựa trên `bigCates`
        if (bigCates?.length) {
            for (const cate of bigCates) {
                let categoryId;
  
                switch (cate.cateId) {
                    case 8:
                        categoryId = 1;
                        break;
                    case 12:
                        categoryId = 3;
                        break;
                    case 10:
                        categoryId = 6;
                        break;
                    default:
                        continue; // Bỏ qua nếu cateId không phù hợp
                }
                const cateEveIds = cate.events.map((event) => event.id);
                if (cate.events?.length) {
                    await this.prisma.eventCategories.updateMany({
                        where: {
                            eventId: { in: cateEveIds },
                            categoryId: categoryId,
                        },
                        data: { isSpecial: true },
                    });
                    this.logger.log(
                        `Updated isSpecial for ${cate.events.length} events in categoryId ${categoryId}.`
                    );
                }
            }
        }
    } catch (error) {
      this.logger.error("Error updating event data:", error.message);
    }
  }
  
  async updateLastScore() {
    try{
      const events = await this.prisma.events.findMany({});
      for (const event of events) {
        const weekClicks = event.weekClicks;
        const lastScore = Math.round(weekClicks / 7);
        await this.prisma.events.update({
          where: { id: event.id },
          data: {
            lastScore: lastScore,
            weekClicks: 0,
          },
        });
      }
    }
    catch (error) {
      this.logger.error("Error updating lastScore:", error.message);
    }
  }
}
