import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { Event } from './eveBox.event.dto';

@Injectable()
export class EveBoxRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEvents(): Promise<Event[]> {
    try{
      await this.prisma.connectIfNeeded();
      const nowDate = new Date();
      const events = await this.prisma.events.findMany({
        where: {
          deleteAt: null,
          isApproved: true,
        },
        select: {
          id: true,
          title: true,
          description: true,
          organizerId: true,
          locationId: true,
          Images_Events_imgLogoIdToImages: true,
          Images_Events_imgPosterIdToImages: true,
          createdAt: true,
          venue: true,
          orgName: true,
          orgDescription: true,
          isOnline: true,
          locations: {
            select: {
                id: true,
                street: true,
                ward: true,
                districtId: true,
                createdAt: true,
                districts: {
                    select: {
                        name: true,
                        province: { select: { name: true } },
                    },
                },
            },
          },
          lastScore: true,
          isSpecial: true,
          isOnlyOnEve: true,
          EventCategories: {
            select: {
              Categories: {
                  select: { id: true, name: true },
              },
              isSpecial: true,
            },
          },
          Showing: {
            where: {
              startTime: {
                gte: nowDate,
              },
            },
            select: {
              id: true,
              eventId: true,
              isFree: true,
              isSalable: true,
              isPresale: true,
              seatMapId: true,
              startTime: true,
              endTime: true,
              isEnabledQueueWaiting: true,
              showAllSeats: true,
              TicketType: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  color: true,
                  isFree: true,
                  price: true,
                  originalPrice: true,
                  maxQtyPerOrder: true,
                  minQtyPerOrder: true,
                  startTime: true,
                  endTime: true,
                  position: true,
                  imageUrl: true,
                  isHidden: true,
                },
              },
            },
          },
        },
      });

      if (events.length === 0) return [];

      let updateEvents: Event[] = [];

      for (const event of events){
        const { street, ward, districts } = event.locations ?? {};
        const districtName = districts?.name || '';
        const provinceName = districts?.province?.name || '';
        const locationsString = `${street || ''}, ${ward || ''}, ${districtName}, ${provinceName}`;

        let minTicketPrice = Infinity;
        let maxTicketPrice = -Infinity;

        for(const showing of event.Showing) {
          for(const ticket of showing.TicketType) {
            if (ticket.price < minTicketPrice) {
              minTicketPrice = ticket.price;
            }
            if (ticket.price > maxTicketPrice) {
              maxTicketPrice = ticket.price;
            }
          }
        }

        updateEvents.push({
          id: event.id,
          name: event.title,
          description: event.description,
          location: locationsString,
          venue: event.venue,
          organizer: event.orgName,
          organizerDescription: event.orgDescription,
          isOnlineEvent: event.isOnline,
          isOnlyOnEvebox: event.isOnlyOnEve,
          isSpecialEvent: event.isSpecial || event.EventCategories.some((category : any) => category.isSpecial),
          totalViews: event.totalClicks,
          viewsPerWeek: event.weekClicks,
          minPrice: minTicketPrice,
          maxPrice: maxTicketPrice,
          categories: event.EventCategories.map((category) => category.Categories.name),
          showingTimes: event.Showing.map((showing) => ({
            start: showing.startTime,
            end: showing.endTime,
          })),
        });
      }
      return updateEvents;
    }catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }
}
