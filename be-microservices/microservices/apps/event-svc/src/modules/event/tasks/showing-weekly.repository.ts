// import { Injectable, Logger } from '@nestjs/common';
// import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
// import { EventWeeklyRepository } from './event-weekly.repository';
// import axios from 'axios';
// import e from 'express';

// @Injectable()
// export class ShowingWeeklyRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   private readonly logger = new Logger(ShowingWeeklyRepository.name);
//   private readonly eventWeeklyRepository = new EventWeeklyRepository(this.prisma);

//   async fetchShowingForEvent(eventId: number) {
//     try{
//       const existEvent = await this.prisma.events.findFirst({
//         where: { id: eventId },
//       });
//       if (!existEvent) {
//         this.logger.warn(`Event ID: ${eventId} does not exist.`);
//         await this.eventWeeklyRepository.createOrUpdateEventDetail(eventId);
//       }

//       const result = await axios.get(`https://api-v2.ticketbox.vn/gin/api/v1/events/${eventId}`);
//       const showings = result.data.data.result.showings;

//       if(showings.length > 0) {
//         for (const showing of showings) {
//           if(showing.status === 'showing_is_over')
//           {
//             this.logger.log(`Showing ID: ${showing.id} is over.`);
//             continue;
//           }
//           const seatmapResult = await axios.get(
//             `https://api-v2.ticketbox.vn/event/api/v1/events/showings/${showing.id}/seatmap`
//           );
//           const seatmap = seatmapResult.data.data.result;

//           await this.prisma.$transaction(async (tx) => {
//             // 1. Upsert Seatmap
//             const updatedSeatmap = await tx.seatmap.upsert({
//               where: { id: seatmap.id },
//               update: {
//                 name: seatmap.name,
//                 status: seatmap.status,
//                 viewBox: seatmap.viewbox,
//               },
//               create: {
//                 id: seatmap.id,
//                 name: seatmap.name,
//                 status: seatmap.status,
//                 viewBox: seatmap.viewbox,
//               },
//             });
//             this.logger.log(`Processed Seatmap: ${updatedSeatmap.id}`);
  
//             // 2. Upsert Showing
//             const createdShowing = await tx.showing.upsert({
//               where: { id: showing.id.toString() },
//               update: {
//                 status: showing.status,
//                 isFree: showing.isFree,
//                 isSalable: showing.isSalable,
//                 isPresale: showing.isPresale,
//                 seatMapId: showing.seatMapId,
//                 startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
//                 endTime: showing.endTime ? new Date(showing.endTime) : null,
//                 isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
//                 showAllSeats: showing.showAllSeats,
//               },
//               create: {
//                 id: showing.id.toString(),
//                 eventId,
//                 status: showing.status,
//                 isFree: showing.isFree,
//                 isSalable: showing.isSalable,
//                 isPresale: showing.isPresale,
//                 seatMapId: showing.seatMapId,
//                 startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
//                 endTime: showing.endTime ? new Date(showing.endTime) : null,
//                 isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
//                 showAllSeats: showing.showAllSeats,
//               },
//             });
//             this.logger.log(`Processed Showing: ${createdShowing.id}`);
  
//             // 3. Upsert Ticket Types
//             for (const ticketType of showing.ticketTypes) {
//               await tx.ticketType.upsert({
//                 where: { id: ticketType.id.toString() },
//                 update: {
//                   showingId: showing.id.toString(),
//                   name: ticketType.name,
//                   description: ticketType.description,
//                   color: ticketType.color,
//                   isFree: ticketType.isFree,
//                   price: ticketType.price,
//                   originalPrice: ticketType.originalPrice,
//                   maxQtyPerOrder: ticketType.maxQtyPerOrder,
//                   minQtyPerOrder: ticketType.minQtyPerOrder,
//                   effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
//                   effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
//                   position: ticketType.position,
//                   status: ticketType.status,
//                   imageUrl: ticketType.imageUrl,
//                 },
//                 create: {
//                   id: ticketType.id.toString(),
//                   showingId: showing.id.toString(),
//                   name: ticketType.name,
//                   description: ticketType.description,
//                   color: ticketType.color,
//                   isFree: ticketType.isFree,
//                   price: ticketType.price,
//                   originalPrice: ticketType.originalPrice,
//                   maxQtyPerOrder: ticketType.maxQtyPerOrder,
//                   minQtyPerOrder: ticketType.minQtyPerOrder,
//                   effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
//                   effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
//                   position: ticketType.position,
//                   status: ticketType.status,
//                   imageUrl: ticketType.imageUrl,
//                 },
//               });
//             }
//           });
//         }
//       }
//     }
//     catch (error) {
//       this.logger.error(`Error fetching showing for event ID: ${eventId}: ${error.message}`);
//       return null;
//     }
//   }

//   async fetchShowingForEventNoShowing(eventId: number) {
//     try {
//       const existEvent = await this.prisma.events.findFirst({
//         where: { id: eventId },
//       });
//       if (!existEvent) {
//         this.logger.warn(`Event ID: ${eventId} does not exist.`);
//         await this.eventWeeklyRepository.createOrUpdateEventDetail(eventId);
//       }
  
//       const result = await axios.get(`https://api-v2.ticketbox.vn/gin/api/v1/events/${eventId}`);
//       const showings = result.data.data.result.showings;
  
//       if (showings.length > 0) {
//         for (const showing of showings) {
//           if (showing.id === 0) {
//             // 🔹 Chỉ lưu Showing với ID tự động sinh và TicketType
//             // this.logger.log(`Processing Showing ID: ${showing.id} (Status: Over)`);
//             const showingIDgenerate = "showing-" + eventId.toString() + "-" + showings.indexOf(showing).toString();
//             this.logger.log(`Generated Showing ID: ${showingIDgenerate}`);
//             await this.prisma.$transaction(async (tx) => {
//               // 1. Tạo Showing (ID tự sinh)
//               const createdShowing = await tx.showing.create({
//                 data: {
//                   id: showingIDgenerate,
//                   eventId,
//                   status: showing.status,
//                   isFree: showing.isFree,
//                   isSalable: showing.isSalable,
//                   isPresale: showing.isPresale,
//                   seatMapId: 184,
//                   startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
//                   endTime: showing.endTime ? new Date(showing.endTime) : null,
//                   isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
//                   showAllSeats: showing.showAllSeats,
//                 },
//               });
//               this.logger.log(`Created Showing with auto-generated ID: ${createdShowing.id}`);
  
//               // 2. Tạo Ticket Types cho showing này
//               for (const ticketType of showing.ticketTypes) {
//                 await tx.ticketType.upsert({
//                   where: { id: ticketType.id.toString() },
//                   update: {
//                     showingId: createdShowing.id, // Liên kết với showing mới
//                     name: ticketType.name,
//                     description: ticketType.description,
//                     color: ticketType.color,
//                     isFree: ticketType.isFree,
//                     price: ticketType.price,
//                     originalPrice: ticketType.originalPrice,
//                     maxQtyPerOrder: ticketType.maxQtyPerOrder,
//                     minQtyPerOrder: ticketType.minQtyPerOrder,
//                     effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
//                     effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
//                     position: ticketType.position,
//                     status: ticketType.status,
//                     imageUrl: ticketType.imageUrl,
//                   },
//                   create: {
//                     id: ticketType.id.toString(),
//                     showingId: createdShowing.id, // Liên kết với showing mới
//                     name: ticketType.name,
//                     description: ticketType.description,
//                     color: ticketType.color,
//                     isFree: ticketType.isFree,
//                     price: ticketType.price,
//                     originalPrice: ticketType.originalPrice,
//                     maxQtyPerOrder: ticketType.maxQtyPerOrder,
//                     minQtyPerOrder: ticketType.minQtyPerOrder,
//                     effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
//                     effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
//                     position: ticketType.position,
//                     status: ticketType.status,
//                     imageUrl: ticketType.imageUrl,
//                   },
//                 });
//               }
//             });
  
//             continue; // 🔹 Skip các bước tiếp theo nếu status là 'showing_is_over'
//           }
//           return;
//           // 🔹 Nếu không phải 'showing_is_over', giữ nguyên logic cũ
//           const seatmapResult = await axios.get(
//             `https://api-v2.ticketbox.vn/event/api/v1/events/showings/${showing.id}/seatmap`
//           );
//           const seatmap = seatmapResult.data.data.result;
  
//           await this.prisma.$transaction(async (tx) => {
//             // 1. Upsert Seatmap
//             const updatedSeatmap = await tx.seatmap.upsert({
//               where: { id: seatmap.id },
//               update: {
//                 name: seatmap.name,
//                 status: seatmap.status,
//                 viewBox: seatmap.viewbox,
//               },
//               create: {
//                 id: seatmap.id,
//                 name: seatmap.name,
//                 status: seatmap.status,
//                 viewBox: seatmap.viewbox,
//               },
//             });
//             this.logger.log(`Processed Seatmap: ${updatedSeatmap.id}`);
  
//             // 2. Upsert Showing (vẫn giữ nguyên ID như cũ)
//             const createdShowing = await tx.showing.upsert({
//               where: { id: showing.id.toString() },
//               update: {
//                 status: showing.status,
//                 isFree: showing.isFree,
//                 isSalable: showing.isSalable,
//                 isPresale: showing.isPresale,
//                 seatMapId: showing.seatMapId,
//                 startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
//                 endTime: showing.endTime ? new Date(showing.endTime) : null,
//                 isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
//                 showAllSeats: showing.showAllSeats,
//               },
//               create: {
//                 id: showing.id.toString(),
//                 eventId,
//                 status: showing.status,
//                 isFree: showing.isFree,
//                 isSalable: showing.isSalable,
//                 isPresale: showing.isPresale,
//                 seatMapId: showing.seatMapId,
//                 startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
//                 endTime: showing.endTime ? new Date(showing.endTime) : null,
//                 isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
//                 showAllSeats: showing.showAllSeats,
//               },
//             });
//             this.logger.log(`Processed Showing: ${createdShowing.id}`);
  
//             // 3. Upsert Ticket Types
//             for (const ticketType of showing.ticketTypes) {
//               await tx.ticketType.upsert({
//                 where: { id: ticketType.id.toString() },
//                 update: {
//                   showingId: showing.id.toString(),
//                   name: ticketType.name,
//                   description: ticketType.description,
//                   color: ticketType.color,
//                   isFree: ticketType.isFree,
//                   price: ticketType.price,
//                   originalPrice: ticketType.originalPrice,
//                   maxQtyPerOrder: ticketType.maxQtyPerOrder,
//                   minQtyPerOrder: ticketType.minQtyPerOrder,
//                   effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
//                   effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
//                   position: ticketType.position,
//                   status: ticketType.status,
//                   imageUrl: ticketType.imageUrl,
//                 },
//                 create: {
//                   id: ticketType.id.toString(),
//                   showingId: showing.id.toString(),
//                   name: ticketType.name,
//                   description: ticketType.description,
//                   color: ticketType.color,
//                   isFree: ticketType.isFree,
//                   price: ticketType.price,
//                   originalPrice: ticketType.originalPrice,
//                   maxQtyPerOrder: ticketType.maxQtyPerOrder,
//                   minQtyPerOrder: ticketType.minQtyPerOrder,
//                   effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
//                   effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
//                   position: ticketType.position,
//                   status: ticketType.status,
//                   imageUrl: ticketType.imageUrl,
//                 },
//               });
//             }
//           });
//         }
//       }
//     } catch (error) {
//       this.logger.error(`Error fetching showing for event ID: ${eventId}: ${error.message}`);
//       return null;
//     }
//   }
  

//   async fetchSeatMapForShowing(showingId: string) {
//     try {
//       const findEvent = await this.prisma.showing.findUnique({
//         where: { id: showingId },
//       });
//       if (!findEvent) {
//         this.logger.log(`showingId ID: ${showingId} not found.`);
//         return;
//       }
//       this.logger.log(`Processing seatmap for showing ID: ${showingId}`);
//       const result = await axios.get(`https://api-v2.ticketbox.vn/event/api/v1/events/showings/${showingId}/seatmap`);
//       const seatmap = result.data.data.result;
//       if (!seatmap) {
//         this.logger.log(`Seatmap ID: ${showingId} not found.`);
//         return;
//       }
//       const seatmapPrisma = await this.prisma.seatmap.findUnique({
//         where: { id: seatmap.id },
//       });
//       if (!seatmapPrisma) {
//         this.logger.log(`Seatmap ID: ${seatmap.id} !already exists.`);
//         return;
//       }
//       await this.updateSection(seatmap);
//       for(const section of seatmap.sections){
//         if(!section.rows || section.rows.length === 0){
//           continue;
//         }
//         await this.updateRow(section);
//         for(const row of section.rows){
//           if(!row.seats || row.seats.length === 0){
//             continue;
//           }
//           await this.updateSeat(row, section, showingId);
//         }
//       }
//       this.logger.log(`Seatmap of showing ID: ${showingId} updated successfully.`);
//     } catch (error) {
//       console.error("Error crawling showings:", error);
//     }
//   }

//   async updateSection(data: any){
//     try {
//       const sectionData: any = data.sections.map((section: any) => ({
//         id: section.id,
//         name: section.name,
//         seatmapId: section.seatMapId,
//         isStage: section.isStage,
//         element: section.elements,
//         attribute: section.attribute,
//         ticketTypeId: section.ticketTypeId || '', // default to empty string if not provided
//       }));
  
//       // Update or create sections in the database
//       const updatePromises: any = sectionData.map(async (section: any) => {
//         return this.prisma.section.upsert({
//           where: { id: section.id },
//           update: {
//             name: section.name,
//             seatmapId: section.seatmapId,
//             isStage: section.isStage,
//             element: section.element,
//             attribute: section.attribute,
//             ticketTypeId: section.ticketTypeId.toString(),
//           },
//           create: {
//             id: section.id,
//             name: section.name,
//             seatmapId: section.seatmapId,
//             isStage: section.isStage,
//             element: section.element,
//             attribute: section.attribute,
//             ticketTypeId: section.ticketTypeId.toString(),
//           },
//         });
//       });
  
//       await Promise.all(updatePromises);
//       this.logger.log('Sections updated successfully');
//     } catch (error) {
//       this.logger.error('Error updating sections:', error);
//     }
//   }

//   async updateRow(data: any) {
//     try {
//       const rowData: any = data.rows.map((row: any) => ({
//         id: row.id,
//         name: row.name,
//         sectionId: row.sectionId,
//       }));
  
//       // Update or create rows in the database
//       const updatePromises: any = rowData.map(async (row: any) => {
//         return this.prisma.row.upsert({
//           where: { id: row.id },
//           update: {
//             name: row.name,
//             sectionId: row.sectionId,
//           },
//           create: {
//             id: row.id,
//             name: row.name,
//             sectionId: row.sectionId,
//           },
//         });
//       });
  
//       await Promise.all(updatePromises);
//       this.logger.log('Rows updated successfully');
//     } catch (error) {
//       this.logger.error('Error updating rows:', error);
//     } 
//   }
//   async updateSeat(data: any, section: any, showingId: string) {
//     try {
//       const seatData = data.seats.map((seat: any) => ({
//         id: seat.id,
//         name: seat.name,
//         rowId: seat.rowId,
//         positionX: seat.x,
//         positionY: seat.y,
//         position: seat.position,
//       }));
  
//       const updatePromises = seatData.map(async (seat: any) => {
//         return this.prisma.seat.upsert({
//           where: { id: seat.id },
//           update: {
//             name: seat.name,
//             rowId: seat.rowId,
//             positionX: seat.positionX,
//             positionY: seat.positionY,
//             position: seat.position,
//           },
//           create: {
//             id: seat.id,
//             name: seat.name,
//             rowId: seat.rowId,
//             positionX: seat.positionX,
//             positionY: seat.positionY,
//             position: seat.position,
//           },
//         });
//       });
  
//       await Promise.all(updatePromises);
//       this.logger.log('Seats updated successfully');
  
//       const updateTicketPromises = data.seats.map(async (seat: any) => {
//         await this.prisma.ticket.create({
//           data: {
//             seatId: Number(seat.id),
//             ticketTypeId: section.ticketTypeId.toString(),
//             showingId: showingId.toString(),
//             status: seat.status,
//             price: section.ticketType?.price || 0,
//           },
//         });
//       });
//       await Promise.all(updateTicketPromises);
//       this.logger.log('Tickets created successfully');
//     } catch (error) {
//       this.logger.error('Error updating seats:', error);
//     }
//   }

//   async fetchSeatMapForShowingTransaction(showingId: string) {
//     try {
//       const findEvent = await this.prisma.showing.findUnique({
//         where: { id: showingId },
//       });
//       if (!findEvent) {
//         this.logger.log(`showingId ID: ${showingId} not found.`);
//         return;
//       }
  
//       this.logger.log(`Processing seatmap for showing ID: ${showingId}`);
//       const result = await axios.get(`https://api-v2.ticketbox.vn/event/api/v1/events/showings/${showingId}/seatmap`);
//       const seatmap = result.data.data.result;
//       if (!seatmap) {
//         this.logger.log(`Seatmap ID: ${showingId} not found.`);
//         return;
//       }
  
//       // Gom toàn bộ transaction trong một connection
//       await this.prisma.$transaction(async (tx) => {
//         // Update Seatmap nếu chưa tồn tại
//         const seatmapExists = await tx.seatmap.findUnique({
//           where: { id: seatmap.id },
//         });
  
//         if (!seatmapExists) {
//           this.logger.log(`Seatmap ID: ${seatmap.id} does not exist.`);
//           return;
//         }
//         this.logger.log(`Section`);
//         // Xử lý Sections
//         const sectionsData = seatmap.sections.map((section: any) => ({
//           id: section.id,
//           name: section.name,
//           seatmapId: section.seatMapId,
//           isStage: section.isStage,
//           element: section.elements,
//           attribute: section.attribute,
//           ticketTypeId: section.ticketTypeId?.toString() || '',
//         }));
//         await tx.section.createMany({ data: sectionsData, skipDuplicates: true });
//         this.logger.log(`Row`);
//         // Xử lý Rows
//         const rowsData = seatmap.sections.flatMap((section: any) =>
//           section.rows?.map((row: any) => ({
//             id: row.id,
//             name: row.name,
//             sectionId: section.id,
//           })) || []
//         );
//         await tx.row.createMany({ data: rowsData, skipDuplicates: true });
//         this.logger.log(`Seat`);
//         // Xử lý Seats
//         const seatsData = seatmap.sections.flatMap((section: any) =>
//           section.rows?.flatMap((row: any) =>
//             row.seats?.map((seat: any) => ({
//               id: seat.id,
//               name: seat.name,
//               rowId: row.id,
//               positionX: seat.x,
//               positionY: seat.y,
//               position: seat.position,
//             })) || []
//           ) || []
//         );
//         await tx.seat.createMany({ data: seatsData, skipDuplicates: true });
//         this.logger.log(`Ticket`);
//         // Xử lý Tickets
//         const ticketsData = seatmap.sections.flatMap((section: any) =>
//           section.rows?.flatMap((row: any) =>
//             row.seats?.map((seat: any) => ({
//               seatId: Number(seat.id),
//               ticketTypeId: section.ticketTypeId?.toString() || '',
//               showingId: showingId.toString(),
//               status: seat.status,
//               price: section.ticketType?.price || 0,
//             })) || []
//           ) || []
//         ).filter((ticket: any) => ticket.ticketTypeId !== ''); // Loại bỏ ticket không có ticketTypeId        
//         await tx.ticket.createMany({ data: ticketsData, skipDuplicates: true });
  
//         this.logger.log(`Seatmap for showing ID: ${showingId} updated successfully.`);
//       });
//     } catch (error) {
//       console.error("Error crawling showings:", error);
//     }
//   }
  
// }