import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";

@Injectable()
export class EventDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEventDetail(eventId: number) {
    const event = await this.prisma.events.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        organizerId: true,
        status: true,
        locationId: true,
        minTicketPrice: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        createdAt: true,
        venue: true,
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
                province: {
                  select: {
                    name: true,
                  },
                },
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
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        Showing:{
          select:{
            id: true,
            eventId: true,
            status: true,
            isFree: true,
            isSalable: true,
            isPresale: true,
            seatMapId: true,
            startTime: true,
            endTime: true,
            isEnabledQueueWaiting: true,
            showAllSeats: true,
            TicketType:{
              select:{
                id: true,
                name: true,
                description: true,
                color: true,
                isFree: true,
                price: true,
                originalPrice: true,
                maxQtyPerOrder: true,
                minQtyPerOrder: true,
                effectiveFrom: true,
                effectiveTo: true,
                position: true,
                status: true,
                imageUrl: true,
                isHidden: true,
              }
            }
          }
        }
      },
    });
    if(!event) {
      return {eventDetail: null, locationsString: ''};
    }

    if(!event.locations) {
      return {eventDetail: event, locationsString: ''};
    }
    const { street, ward, districts } = event.locations;
    const districtName = districts?.name || '';
    const provinceName = districts?.province?.name || '';
    const locationsString = `${street}, ${ward}, ${districtName}, ${provinceName}`;
    
  
    return {eventDetail: event, locationsString};
  }
  
  async getRecommendedEventsInDetail(eventId: number, limit: string) {
    const event = await this.prisma.events.findUnique({
      where: { id: eventId },
      select: {
        locations: {
          select: {
            districts: {
              select: {
                provinceId: true,
              },
            },
          },
        },
      },
    });
  
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found.`);
    }
  
    const provinceId = event.locations.districts.provinceId;
    const now = new Date();
    const events = await this.prisma.events.findMany({
      where: {
        locations: {
          districts: {
            provinceId: provinceId,
          },
        },
        startDate: limit === 'all' ? undefined : { gte: now }, 
        id: { not: eventId }, 
      },
      orderBy: [
        { startDate: 'asc' }, 
        { lastScore: 'desc' }, 
      ],
      take: limit === 'all' ? undefined : parseInt(limit, 10),
      select: {
        id: true,
        title: true,
        startDate: true,
        status: true,
        lastScore: true,
        minTicketPrice: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        weekClicks: true,
        totalClicks: true,
      },
    });
  
    return events;
  }
  
  async postClicks(eventId: number) {
    try{
      const event = await this.prisma.events.update({
        where: { id: eventId },
        data: {
          weekClicks: {
            increment: 1,
          },
          totalClicks: {
            increment: 1,
          },
        },
      });
      if (event) return 1;
      return 0;
    }
    catch (error) {
      return 2;
    }
  }
}