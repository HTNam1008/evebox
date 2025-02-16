import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { TicketTypeService } from './tickettype.service';
import { CreateTicketTypeDto } from './create-tickettype.dto';
import { UpdateTicketTypeDto } from './update-tickettype.dto';

@Controller('api/tickettype')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) { }

  @Post()
  @ApiOperation({ summary: 'Create new ticket type' })
  @ApiBody({ type: CreateTicketTypeDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Ticket type created successfully',
    content: {
      'application/json': {
        example: {
          id: "tickettype_abc123",
          name: "VIP Ticket",
          price: 1500000,
          status: "active"
        }
      }
    }
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
    content: {
      'application/json': {
        example: {
          total: 3,
          data: [
            {
              id: "tickettype_abc123",
              name: "VIP Ticket",
              description: "Best seat in the house",
              price: 1500000,
              status: "active"
            },
            {
              id: "tickettype_def456",
              name: "Standard Ticket",
              description: "Regular seating",
              price: 500000,
              status: "active"
            },
            {
              id: "tickettype_xyz789",
              name: "Student Ticket",
              description: "Discount for students",
              price: 200000,
              status: "inactive"
            }
          ]
        }
      }
    }
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
    content: {
      'application/json': {
        example: {
          id: "tickettype_abc123",
          name: "VIP Ticket",
          description: "Best seat in the house",
          price: 1500000,
          status: "active"
        }
      }
    }
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
    const result = await this.ticketTypeService.getById(id);
    if (!result) throw new NotFoundException('Ticket type not found');
    return result;
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update ticket type data' })
  @ApiBody({ type: UpdateTicketTypeDto })
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
    const result = await this.ticketTypeService.update(id, dto);
    if (!result) throw new NotFoundException('Ticket type not found');
    return result;
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
    const result = await this.ticketTypeService.delete(id);
    if (!result) throw new NotFoundException('Ticket type not found');
    return result;
  }
}