import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TicketTypeService } from './tickettype.service';
import { CreateTicketTypeDto } from '../../domains/entities/create-tickettype.entity';
import { UpdateTicketTypeDto } from '../../domains/entities/update-tickettype.entity';

@Controller('tickettype')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @Post()
  async create(@Body() dto: CreateTicketTypeDto) {
    return this.ticketTypeService.create(dto);
  }

  @Get()
  async findAll() {
    return this.ticketTypeService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketTypeService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTicketTypeDto) {
    return this.ticketTypeService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ticketTypeService.delete(id);
  }
}