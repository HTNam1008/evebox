import { Injectable } from '@nestjs/common';
import { GetOrdersRepository } from '../../repositories/getOrders.repository';
import { Result, Err } from 'oxide.ts';
import { TicketOrderData } from './getOrders-response.dto';

@Injectable()
export class GetOrdersService {
  constructor(private readonly getOrdersRepository: GetOrdersRepository) {}

  async getOrders(showingId: string, organizerId: string): Promise<Result<TicketOrderData[], Error>> {
    try {
      if (!showingId) {
        return Err(new Error('Showing ID is required'));
      }

      if (!organizerId) {
        return Err(new Error('Unauthorized user'));
      }

      const canManage = await this.getOrdersRepository.hasPermissionToManageMembers(showingId, organizerId);

      if (!canManage) {
        return Err(new Error('You do not have permission to manage members.'));
      }

      return await this.getOrdersRepository.getOrders(showingId, organizerId);
    } catch (error) {
      return Err(new Error('Failed to get orders'));
    }
  }
}
