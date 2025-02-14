import { Injectable } from '@nestjs/common';
import { TicketTypeRepository } from '../../repositories/tickettype.repository';
import { CreateTicketTypeDto } from '../../domains/entities/create-tickettype.entity';
import { UpdateTicketTypeDto } from '../../domains/entities/update-tickettype.entity';

@Injectable()
export class TicketTypeService {
  constructor(private readonly ticketTypeRepository: TicketTypeRepository) {}

  async create(dto: CreateTicketTypeDto) {
    return this.ticketTypeRepository.create(dto);
  }

  async getAll() {
    return this.ticketTypeRepository.findAll();
  }

  async getById(id: string) {
    return this.ticketTypeRepository.findById(id);
  }

  async update(id: string, dto: UpdateTicketTypeDto) {
    return this.ticketTypeRepository.update(id, dto);
  }

  async delete(id: string) {
    return this.ticketTypeRepository.delete(id);
  }
}