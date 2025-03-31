// import { Injectable, Logger } from '@nestjs/common';
// import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
// import axios from 'axios';

// @Injectable()
// export class EventWeeklyRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   private readonly logger = new Logger(EventWeeklyRepository.name);

//   async fetchEventDetails(eventId: number) {
//     try {
//       this.logger.log(`Fetching details for event ID: ${eventId}`);
//       const response = await axios.get(`https://api-v2.ticketbox.vn/gin/api/v1/events/${eventId}`);
//       if (response.data.status === 1) {
//         this.logger.log(`Fetched details for event ID: ${eventId}`);
//         return response.data.data.result;
//       } else {
//         this.logger.warn(`Failed to fetch details for event ID: ${eventId}`);
//         return null;
//       }
//     } catch (error) {
//       this.logger.error(`Error fetching details for event ID: ${eventId}: ${error.message}`);
//       return null;
//     }
//   }

//   async handleEventLocation(address: string) {
//     try {
//       let parts = address.split(",").map((part) => part.trim());
//       let province = parts.pop();
//       let district = parts.pop();
//       let streetAndWard = parts.join(", ");
//       let [street, ward] = streetAndWard.includes(",")
//         ? streetAndWard.split(",").map((part) => part.trim())
//         : [streetAndWard, ""];

//       let provinceAdd = await this.prisma.province.findFirst({
//           where: { name: province || "Default"},
//       });
      
//       if (!provinceAdd) {
//           provinceAdd = await this.prisma.province.create({
//               data: { name: province || "Default"},
//           });
//           this.logger.log(`Province "${province}" created.`);
//       }
      
//       let districtAdd = await this.prisma.districts.findFirst({
//         where: { name: district || "Default", provinceId: provinceAdd.id },
//       });
//       if (!districtAdd) {
//         districtAdd = await this.prisma.districts.create({
//           data: { name: district || "Default", provinceId: provinceAdd.id },
//         });
//         this.logger.log(`District "${district}" created.`);
//       }
      
//       let location = await this.prisma.locations.findFirst({
//         where: { street, ward, districtId: districtAdd.id },
//       });
//       if (!location) {
//         location = await this.prisma.locations.create({
//           data: { street, ward, districtId: districtAdd.id },
//         });
//         this.logger.log(`Location "${street}, ${ward}, ${district}" created.`);
//       }
      
//       this.logger.log(`Location resolved: ${street}, ${ward}, ${district}, ${province}`);
//       return location;
//     } catch (error) {
//       this.logger.error(`Error handling event location: ${error.message}`);
//       throw error;
//     }
//   }

//   async addToEventCategory(categories: string[], eventId: number) {
//     try {
//       const existingEventCategories = await this.prisma.eventCategories.findMany({
//         where: { eventId },
//         select: { categoryId: true },
//       });

//       const existingCategoryIds = existingEventCategories.map(ec => ec.categoryId);
//       let newCategoryIds = [];

//       for (const categoryName of categories) {
//         let category = await this.prisma.categories.findFirst({
//           where: { name: categoryName },
//         });
//         if (!category) {
//           category = await this.prisma.categories.create({
//             data: { name: categoryName },
//           });
//           this.logger.log(`Category "${categoryName}" created.`);
//         }

//         newCategoryIds.push(category.id);
//         if (!existingCategoryIds.includes(category.id)) {
//           await this.prisma.eventCategories.create({
//             data: { eventId, categoryId: category.id },
//           });
//           this.logger.log(`Category "${categoryName}" linked to event ID: ${eventId}`);
//         }
//       }

//       for (const categoryId of existingCategoryIds) {
//         if (!newCategoryIds.includes(categoryId)) {
//           await this.prisma.eventCategories.deleteMany({
//             where: { eventId, categoryId },
//           });
//           this.logger.log(`Removed category ID: ${categoryId} from event ID: ${eventId}`);
//         }
//       }
//     } catch (error) {
//       this.logger.error(`Error handling event categories: ${error.message}`);
//       throw error;
//     }
//   }

//   async createOrUpdateEventDetail(eventId: number) {
//     try {
//       const fetchedEventDetails = await this.fetchEventDetails(eventId);
//       if (!fetchedEventDetails) return;

//       let createdPosterImage = await this.prisma.images.findFirst({
//         where: { imageUrl: fetchedEventDetails.bannerURL },
//       });

//       if (!createdPosterImage) {
//         createdPosterImage = await this.prisma.images.create({
//           data: { imageUrl: fetchedEventDetails.bannerURL },
//         });
//       }

//       let createdLogoImage = await this.prisma.images.findFirst({
//         where: { imageUrl: fetchedEventDetails.orgLogoURL },
//       });

//       if (!createdLogoImage) {
//         createdLogoImage = await this.prisma.images.create({
//           data: { imageUrl: fetchedEventDetails.orgLogoURL },
//         });
//       }

//       const location = await this.handleEventLocation(fetchedEventDetails.address);

//       const createdEvent = await this.prisma.events.upsert({
//         where: { id: fetchedEventDetails.originalId },
//         update: {
//           title: fetchedEventDetails.title,
//           description: fetchedEventDetails.description || "Default Event Description",
//           startDate: new Date(fetchedEventDetails.startTime),
//           endDate: new Date(fetchedEventDetails.endTime),
//           imgPosterId: createdPosterImage.id,
//           imgLogoId: createdLogoImage.id,
//           status: fetchedEventDetails.status || "active",
//           locationId: location.id,
//           venue: fetchedEventDetails.venue || "Default Venue",
//           lastScore: 0,
//           minTicketPrice: fetchedEventDetails.minTicketPrice || 0,
//         },
//         create: {
//           id: fetchedEventDetails.originalId,
//           title: fetchedEventDetails.title,
//           description: fetchedEventDetails.description || "Default Event Description",
//           startDate: new Date(fetchedEventDetails.startTime),
//           endDate: new Date(fetchedEventDetails.endTime),
//           locationId: location.id,
//           venue: fetchedEventDetails.venue || "Default Venue",
//           imgPosterId: createdPosterImage.id,
//           imgLogoId: createdLogoImage.id,
//           status: fetchedEventDetails.status || "active",
//           lastScore: 0,
//           minTicketPrice: fetchedEventDetails.minTicketPrice || 0,
//         },
//       });
//       this.logger.log(`Event "${fetchedEventDetails.title}" (ID: ${fetchedEventDetails.originalId}) created or updated.`);
//       await this.addToEventCategory(fetchedEventDetails.categoriesV2, createdEvent.id);
//       return createdEvent;
//     } catch (error) {
//       this.logger.error(`Error creating/updating event: ${error.message}`);
//       throw error;
//     }
//   }

//   async fetchEventsFromTicketBox(page: number, categories: string) {
//     try {
//       const response = await axios.get(`https://api-v2.ticketbox.vn/search/v2/events?limit=20&page=${page}&categories=${categories}`);
//       const events = response.data.data.results;

//       if (!events || events.length === 0) {
//         this.logger.warn('No events found in API response');
//         return;
//       }
//       this.logger.log(`Fetched ${events.length} events from Ticketbox API`);
//       this.logger.log(`Processing ${events.length} events...`);
//       for (const event of events) {
//         if (!event.id) {
//           this.logger.error("Event ID is undefined. Skipping this event.");
//           continue;
//         }

//         this.logger.log(`Processing event ID: ${event.id}`);
        
//         try {
//           await this.createOrUpdateEventDetail(event.id);
          
//         } catch (error) {
//           this.logger.error(`Error syncing event ${event.id}: ${error.message}`);
//         }
//       }
      
//     } catch (error) {
//       this.logger.error(`Error fetching data: ${error.message}`);
//     } 
//   }

//   async updateAllEvents() {
//     const events = await this.prisma.events.findMany({ select: { id: true } });
  
//     // Lấy toàn bộ thông tin sự kiện trước khi cập nhật
//     const updatedData = await Promise.all(
//       events.map(async (event) => {
//         const fetchedEventDetails = await this.fetchEventDetails(event.id);
//         if (!fetchedEventDetails) return null;
//         return {
//           where: { id: event.id },
//           data: { minTicketPrice: fetchedEventDetails.minTicketPrice || 0 },
//         };
//       })
//     );
  
//     // Lọc ra những dữ liệu hợp lệ
//     const validUpdates = updatedData.filter(Boolean);
  
//     // Dùng $transaction để thực hiện tất cả cập nhật trong một lần duy nhất
//     await this.prisma.$transaction(
//       validUpdates.map((update) => this.prisma.events.update(update))
//     );
//   }  
// }
