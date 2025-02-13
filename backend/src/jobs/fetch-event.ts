// import { PrismaClient } from '@prisma/client';
// import { default as axios } from 'axios';

// const prisma = new PrismaClient();

// async function fetchTicketsFromTicketbox(page) {
//   try {
//     const response = await axios.get(`https://api-v2.ticketbox.vn/search/v2/events?limit=20&page=${page}&categories=others`);
//     const events = response.data.data.results;

//     if (!events || events.length === 0) {
//       console.log('No events found in API response');
//       return;
//     }

//     console.log(`Fetched ${events.length} events from Ticketbox API`);

//     for (const event of events) {
//       if (!event.id) {
//         console.error("Event ID is undefined. Skipping this event.");
//         continue;
//       }
    
//       try {
//         // 1. Tạo bản ghi trong bảng Images cho imageUrl và orgLogoUrl
//         const createdPosterImage = await prisma.images.create({
//           data: {
//             imageUrl: event.imageUrl,
//           },
//         });
    
//         const createdLogoImage = await prisma.images.create({
//           data: {
//             imageUrl: event.orgLogoUrl,
//           },
//         });
    
//         // 2. Upsert bản ghi trong bảng Events
//         const createdEvent = await prisma.events.upsert({
//           where: { id: event.id },
//           update: {
//             title: event.name,
//             description: null,
//             startDate: new Date(event.day),
//             endDate: new Date(event.day),
//             totalTickets: 100,
//             availableTickets: 100,
//             locationId: 1,
//             imgPosterId: createdPosterImage.id,
//             imgLogoId: createdLogoImage.id,
//           },
//           create: {
//             id: event.id,
//             title: event.name,
//             description: null,
//             startDate: new Date(event.day),
//             endDate: new Date(event.day),
//             totalTickets: 100,
//             availableTickets: 100,
//             locationId: 1,
//             imgPosterId: createdPosterImage.id,
//             imgLogoId: createdLogoImage.id,
//             status: "active",
//           },
//         });
    
//         console.log(`Event "${createdEvent.title}" synced!`);
    
//         // 3. Kiểm tra và thêm các categories vào bảng Categories
//         for (const categoryName of event.categories) {
//           let category = await prisma.categories.findFirst({
//             where: { name: categoryName },
//           });
    
//           if (!category) {
//             category = await prisma.categories.create({
//               data: { name: categoryName },
//             });
//             console.log(`Category "${categoryName}" created.`);
//           }
    
//           // 4. Thêm vào bảng EventCategories
//           await prisma.eventCategories.create({
//             data: {
//               eventId: createdEvent.id,
//               categoryId: category.id,
//             },
//           });
    
//           console.log(`Category "${categoryName}" linked to event "${createdEvent.title}".`);
//         }
//       } catch (error) {
//         console.error(`Error syncing event ${event.id}:`, error);
//       }
//     }
    
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// for (let page = 1; page <= 10; page++) {
//   fetchTicketsFromTicketbox(page);
// }
