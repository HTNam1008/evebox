import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketTypeService } from './tickettype.service';
import { CreateTicketTypeDto } from './dto/create-tickettype.dto';
import { UpdateTicketTypeDto } from './dto/update-tickettype.dto';

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTicketTypeDto) {
    return this.ticketTypeService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ticketTypeService.delete(id);
  }
}