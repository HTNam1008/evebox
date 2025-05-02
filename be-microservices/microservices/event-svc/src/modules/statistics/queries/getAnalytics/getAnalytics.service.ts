import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { AnalyticsResponseDto } from './getAnalytics-response.dto';
import { StatisticsRepository } from '../../repositories/getAnalytics.repository';

@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsRepository: StatisticsRepository) {}

  async getAnalytics(eventId: number, email: string, startDate?: Date, endDate?: Date): Promise<Result<AnalyticsResponseDto, Error>> {
    const event = await this.statisticsRepository.findEventById(eventId);
    if (!event) return Err(new Error('Event not found'));
    if (event.organizerId !== email) return Err(new Error('Unauthorized'));

    const canManage = await this.statisticsRepository.hasPermissionToManageMembers(eventId, email);

      if (!canManage) {
        return Err(new Error('You do not have permission to manage members.'));
      }

    // const totalClicks = await this.statisticsRepository.countUniqueUsersByEvent(eventId, startDate,endDate);
    const totalUsers = await this.statisticsRepository.countUniqueUsersByEvent(eventId, startDate,endDate);
    const totalOrders = await this.statisticsRepository.countOrdersByEvent(eventId);
    const totalBuyers = await this.statisticsRepository.countBuyersByEvent(eventId);
    const statistic = await this.statisticsRepository.getStatistic(eventId);

    const response: AnalyticsResponseDto = {
      eventId: event.id,
      eventTitle: event.title,
      totalClicks: event.totalClicks,
      weekClicks: event.weekClicks,
      totalUsers,
      totalBuyers, 
      transferRating: (totalBuyers/totalUsers), 
      totalOrders,
      statistic
    };

    return Ok(response);
  }
}
