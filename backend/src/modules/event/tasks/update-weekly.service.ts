import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { EventWeeklyRepository } from './event-weekly.repository';
import { FrontDisplayWeeklyRepository } from './front-display-weekly.repository';
import { ShowingWeeklyRepository } from './showing-weekly.repository';

@Injectable()
export class UpdateWeeklyService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(UpdateWeeklyService.name);
  private readonly eventWeeklyRepository = new EventWeeklyRepository(this.prisma);
  private readonly frontDisplayWeeklyRepository = new FrontDisplayWeeklyRepository(this.prisma);
  private readonly showingWeeklyRepository = new ShowingWeeklyRepository(this.prisma);

  // Tự động chạy vào thứ 2 đầu tuần
  @Cron('0 0 * * 1')
  // @Cron('14 22 * * 4')
  async handleMondayJob() {
    this.logger.log('Running database update task on Monday...');
    return;
    // Update event_weekly
    for (let page = 1; page <= 20; page++) {
      await this.eventWeeklyRepository.fetchEventsFromTicketBox(page,"music");
      await this.eventWeeklyRepository.fetchEventsFromTicketBox(page,"theatersandart");
      await this.eventWeeklyRepository.fetchEventsFromTicketBox(page,"sport");
      await this.eventWeeklyRepository.fetchEventsFromTicketBox(page,"others");
    }

    // Update front_display_weekly
    await this.frontDisplayWeeklyRepository.updateFrontDisplayWeekly();
    await this.frontDisplayWeeklyRepository.updateLastScore();
    // Update showing_weekly
    const eventIds = await this.prisma.events.findMany({
      select: { id: true },
    });

    // Chạy qua tất cả các ID sự kiện
    for (const { id } of eventIds) {
      this.logger.log(`Processing event ID: ${id}`);
      await this.showingWeeklyRepository.fetchShowingForEventNoShowing(id);
      // break;
    }

    const showingIds = await this.prisma.showing.findMany({
      select: { id: true },
    });
    for (const { id } of showingIds) {
      await this.showingWeeklyRepository.fetchSeatMapForShowingTransaction(id);
      // break;
    }
  }

}
