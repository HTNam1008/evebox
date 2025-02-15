import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { TicketTypeService } from './tickettype.service';
import { CreateTicketTypeDto } from '../../dto/create-tickettype.dto';
import { UpdateTicketTypeDto } from '../../dto/update-tickettype.dto';

@Controller('api/tickettype')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) { }

  @Post()
  @ApiOperation({ summary: 'Create new ticket type' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Ticket type created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async create(@Body() dto: CreateTicketTypeDto) {
    return this.ticketTypeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ticket types' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All ticket types retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findAll() {
    return this.ticketTypeService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ticket type data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Showing data retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findOne(@Param('id') id: string) {
    return this.ticketTypeService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update ticket type data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ticket type data updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async update(@Param('id') id: string, @Body() dto: UpdateTicketTypeDto) {
    return this.ticketTypeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete ticket type' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ticket type deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async remove(@Param('id') id: string) {
    return this.ticketTypeService.delete(id);
  }
}