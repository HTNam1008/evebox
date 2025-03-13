import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getUserTicketRepository } from '../../repositories/getUserTicket.repository';
import { UserTicketDto } from './getUserTicket-response.dto';
import e from 'express';

@Injectable()
export class GetUserTicketService {
  constructor(
    private getUserTicketRepository: getUserTicketRepository,
  ) {}
  async execute(email: string): Promise<Result<UserTicketDto[], Error>> {
    try {
      const tickets = await this.getUserTicketRepository.getUserTicket(email);
      if (!tickets) {
        return Err(new Error('No tickets found'));
      }
      return Ok(tickets);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to select seat'));
    }
  }
}