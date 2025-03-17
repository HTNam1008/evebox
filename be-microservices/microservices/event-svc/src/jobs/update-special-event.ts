// import axios from "axios";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function resetEventData() {
//   try {
//       // Reset `isSpecial` và `isOnlyOnEve` về false cho tất cả sự kiện
//       await prisma.events.updateMany({
//           data: {
//               isSpecial: false,
//               isOnlyOnEve: false,
//           },
//       });
//       console.log("Reset isSpecial and isOnlyOnEve for all events.");
//       // Reset `isSpecial` về false cho tất cả `EventCategories`
//       await prisma.eventCategories.updateMany({
//           data: {
//               isSpecial: false,
//           },
//       });
//       console.log("Reset isSpecial for all EventCategories.");
//   } catch (error) {
//       console.error("Error resetting event data:", error.message);
//   }
// }

// async function fetchCategories() {
//   try {
//       const response = await axios.get("https://api-v2.ticketbox.vn/gin/api/v2/discovery/categories");
//       //console.log(response.status);
//       if (response.status === 200 && response.data.data.result) {
//           console.log("Fetched categories successfully.");
//           return response.data.data.result;
//       } else {
//           console.error("Failed to fetch categories.");
//           return null;
//       }
//   } catch (error) {
//       console.error("Error fetching categories:", error.message);
//       return null;
//   }
// }

// async function updateEventData(res) {
//   if (!res) return;

//   try {
//       const { bigCates } = res;
//       const specialEventIds = res.specialEvents.events.map(event => event.id);
//       const onlyOnTicketboxIds = res.onlyOnTicketbox.events.map(event => event.id);
//       const trendingEventIds = res.trendingEvents.events.map(event => event.id);

//       // Cập nhật `isSpecial` thành true cho các sự kiện trong `specialEvents`
//       if (specialEventIds.length > 0) {
//           await prisma.events.updateMany({
//               where: {
//                   id: { in: specialEventIds },
//               },
//               data: {
//                   isSpecial: true,
//               },
//           });
//           console.log("Updated isSpecial for special events.");
//       }

//       // Cập nhật `isOnlyOnEve` thành true cho các sự kiện trong `onlyOnTicketbox`
//       if (onlyOnTicketboxIds.length > 0) {
//           await prisma.events.updateMany({
//               where: {
//                   id: { in: onlyOnTicketboxIds },
//               },
//               data: {
//                   isOnlyOnEve: true,
//               },
//           });
//           console.log("Updated isOnlyOnEve for events only on Ticketbox.");
//       }

//       // // Cập nhật `lastScore` thành 10 cho các sự kiện trong `trendingEvents`
//       // if (trendingEventIds.length > 0) {
//       //     await prisma.events.updateMany({
//       //         where: {
//       //             id: { in: trendingEventIds },
//       //         },
//       //         data: {
//       //             lastScore: 10,
//       //         },
//       //     });
//       //     console.log("Updated lastScore for trending events.");
//       // }
//       // Cập nhật `isSpecial` trong `EventCategories` dựa trên `bigCates`
//       if (bigCates?.length) {
//           for (const cate of bigCates) {
//               let categoryId;

//               switch (cate.cateId) {
//                   case 8:
//                       categoryId = 1;
//                       break;
//                   case 12:
//                       categoryId = 3;
//                       break;
//                   case 10:
//                       categoryId = 6;
//                       break;
//                   default:
//                       continue; // Bỏ qua nếu cateId không phù hợp
//               }
//               const cateEveIds = cate.events.map((event) => event.id);
//               if (cate.events?.length) {
//                   await prisma.eventCategories.updateMany({
//                       where: {
//                           eventId: { in: cateEveIds },
//                           categoryId: categoryId,
//                       },
//                       data: { isSpecial: true },
//                   });
//                   console.log(
//                       `Updated isSpecial for ${cate.events.length} events in categoryId ${categoryId}.`
//                   );
//               }
//           }
//       }
//   } catch (error) {
//       console.error("Error updating event data:", error.message);
//   }
// }

// async function main() {
//   try {
//       resetEventData();
//       console.log("Fetching categories...");
//       const res = await fetchCategories();
//       if (!res) {
//           console.log("No data fetched. Exiting...");
//           return;
//       }

//       console.log("Updating event data...");
//       await updateEventData(res);
//   } catch (error) {
//       console.error("Error in main function:", error.message);
//   } finally {
//       await prisma.$disconnect();
//   }
// }

// main()