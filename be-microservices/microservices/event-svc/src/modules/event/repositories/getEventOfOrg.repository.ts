import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Result, Ok, Err } from 'oxide.ts';
import { GetEventDetailRepository } from './getEventDetail.repository';
import { EventOrgFrontDisplayDto } from '../queries/getEventOfOrg/getEventOfOrg-response.dto';

@Injectable()
export class GetEventOfOrgRepository {
  constructor(private readonly prisma: PrismaService,
    private readonly getEventDetailRepository: GetEventDetailRepository,
  ) {}

  async findAll(organizerId: string): Promise<Result<EventOrgFrontDisplayDto[], Error>> {
    try {
      const events = await this.prisma.events.findMany({
        where: {
          organizerId: organizerId,
          deleteAt: null,
        },
        select: {
          id: true,
          title: true,
          venue: true,
          Images_Events_imgLogoIdToImages: true,
          Images_Events_imgPosterIdToImages: true,
          deleteAt: true,
          locations: {
            select: {
              street: true,
              ward: true,
              districts: {
                select:{
                  name: true,
                  province: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          },
          isApproved: true,
        }
      });
      
      let updateEvents = [];
      for(const event of events) {
        const showings = await this.prisma.showing.findMany({
          where: {
            eventId: event.id,
          },
          select: {
            id: true,
            startTime: true,
          },
        });
        // Xử lý địa chỉ
        const { street, ward, districts } = event.locations ?? {};
        const districtName = districts?.name || '';
        const provinceName = districts?.province?.name || '';
        const locationsString = `${street || ''}, ${ward || ''}, ${districtName}, ${provinceName}`;
        const startTime = await this.caculateEventsStartDate(showings);
        updateEvents = [...updateEvents, {...event, startTime, locationsString}];
      }
      return Ok(updateEvents);
    } catch (error) {
      return Err(new Error('Failed to retrieve categories'));
    }
  }
  async caculateEventsStartDate(showings: any[]) {
    let startTime = new Date("9999-12-31T23:59:59.999Z");
    const nowDate = new Date();
    for (const showing of showings) {
      if (new Date(showing.startTime) > nowDate && new Date(showing.startTime) < startTime) {
        startTime = new Date(showing.startTime);
        continue;
      }
      if (new Date(showing.startTime) < startTime) {
        startTime = new Date(showing.startTime);
      }
    }
    return startTime;
  }
}