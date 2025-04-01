import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { getUserTicketRepository } from '../../repositories/getUserTicket.repository';
import e from 'express';
import { UserTicketByIdDto } from './getUserTicketById-response.dto';

@Injectable()
export class GetUserTicketByIdService {
  constructor(
    private getUserTicketRepository: getUserTicketRepository,
  ) {}
  async execute(id: string, email: string): Promise<Result<UserTicketByIdDto, Error>> {
    try {
      const userTickets = await this.getUserTicketRepository.getUserTicketById(email, id);
      if (!userTickets) {
        return Err(new Error('User ticket not found.'));
      }
      return Ok(userTickets);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to select seat'));
    }
  }
}