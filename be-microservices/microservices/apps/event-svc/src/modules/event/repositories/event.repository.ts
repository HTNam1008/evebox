// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
// import { EventData } from '../domain/entities/event.entity';
// import { CreateEventDto, UpdateEventDto } from '../commands/event/event.dto';

// @Injectable()
// export class EventRepository {
//   constructor(private prisma: PrismaService) {}

//   async create(createEventDto: CreateEventDto, imgLogoId: number | null, imgPosterId: number | null, locationId: number): Promise<EventData> {
//     return this.prisma.events.create({
//       data: {
//         title: createEventDto.title,
//         description: createEventDto.description,
//         startDate: createEventDto.startDate,
//         endDate: createEventDto.endDate,
//         status: createEventDto.status,
//         locationId: locationId,
//         imgLogoId: imgLogoId || undefined,
//         imgPosterId: imgPosterId || undefined,
//         organizerId: createEventDto.organizerId || undefined,
//         isOnlyOnEve: false,
//         isSpecial: false,
//         createdAt: new Date(),
//         lastScore: 0,
//         totalClicks: 0,
//         weekClicks: 0,
//        },
//     });
//   }

//   async findAll(): Promise<EventData[]> {
//     return this.prisma.events.findMany({ include: { 
//       EventCategories: {
//         select: {
//           Categories: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//         },
//       }, 
//       Images_Events_imgLogoIdToImages: true, 
//       Images_Events_imgPosterIdToImages: true,
//       Showing: true,  
//     } });
//   }

//   async findOne(id: number): Promise<EventData | null> {
//     return this.prisma.events.findUnique({ where: { id }, include: { 
//       EventCategories: {
//         select: {
//           Categories: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//         },
//       }, 
//       Images_Events_imgLogoIdToImages: true, 
//       Images_Events_imgPosterIdToImages: true,
//       Showing: true,
//      } });
//   }

//   async update(id: number, updateEventDto: UpdateEventDto, imgLogoId?: number, imgPosterId?: number): Promise<EventData> {
//     return this.prisma.events.update({
//       where: { id },
//       data: {
//         ...updateEventDto,
//         imgLogoId: imgLogoId || updateEventDto.imgLogoId,
//         imgPosterId: imgPosterId || updateEventDto.imgPosterId,
//       },
//     });
//   }

//   async delete(id: number): Promise<void> {
//     await this.prisma.events.delete({ where: { id } });
//   }
// }
