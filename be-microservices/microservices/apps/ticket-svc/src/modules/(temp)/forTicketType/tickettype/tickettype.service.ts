// import { Injectable } from '@nestjs/common';
// import { Result, Ok, Err } from 'oxide.ts';
// import { TicketTypeRepository } from '../../repositories/tickettype.repository';
// import { CreateTicketTypeDto } from './create-tickettype.dto';
// import { UpdateTicketTypeDto } from './update-tickettype.dto';

// @Injectable()
// export class TicketTypeService {
//   constructor(private readonly ticketTypeRepository: TicketTypeRepository) {}

//   async create(dto: CreateTicketTypeDto) {
//     // return this.ticketTypeRepository.create(dto);
//     try {
//       return Ok(await this.ticketTypeRepository.create(dto));
//     } catch (error) {
//       console.error(error);
//       return Err(new Error('Failed to create ticket type.'));
//     }
//   }

//   async getAll() {
//     // return this.ticketTypeRepository.findAll();
//     try {
//       return Ok(await this.ticketTypeRepository.getAllTicketType());
//     } catch (error) {
//       console.error(error);
//       return Err(new Error('Failed to fetch ticket types'));
//     }
//   }

//   async getById(id: string) {
//     // return this.ticketTypeRepository.findTicketTypeById(id);
//     try {
//       return Ok(await this.ticketTypeRepository.findTicketTypeById(id));
//     } catch (error) {
//       console.error(error);
//       return Err(new Error('Failed to fetch ticket type'));
//     }
//   }

//   async update(id: string, dto: UpdateTicketTypeDto) {
//     // return this.ticketTypeRepository.update(id, dto);
//     try {
//       return Ok(await this.ticketTypeRepository.update(id, dto));
//     } catch (error) {
//       console.error(error);
//       return Err(new Error('Failed to update ticket type'));
//     }
//   }

//   async delete(id: string) {
//     // return this.ticketTypeRepository.delete(id);
//     try {
//       return Ok(await this.ticketTypeRepository.delete(id));
//     } catch (error) {
//       console.error(error);
//       return Err(new Error('Failed to delete ticket type'));
//     }
//   }
// }