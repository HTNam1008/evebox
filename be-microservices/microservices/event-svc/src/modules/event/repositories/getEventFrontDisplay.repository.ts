import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { GetEventDetailRepository } from './getEventDetail.repository';

@Injectable()
export class GetEventFrontDisplayRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getEventDetailRepository: GetEventDetailRepository,
  ) {}

  async getSpecialEvents() {
    const events = await this.prisma.events.findMany({
      where: {
        isSpecial: true,
        deleteAt: null,
        Showing: {
          some: {
            startTime: {
              gte: new Date(),
            },
          },
        }
      },
      select: {
        id: true,
        title: true,
        lastScore: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        totalClicks: true,
        weekClicks: true,
      },
    });
    let updateEvents = [];
    const now = new Date();
    for(const event of events) {
      const showings = await this.prisma.showing.findMany({
        where: {
          eventId: event.id,
          startTime: {
            gte: now,
          },
        },
        select: {
          id: true,
          startTime: true,
          TicketType: {
            select: {
              price: true,
              id: true,
            }
          }
        },
      });
      const eventAddition = await this.caculateEvents(showings);
      updateEvents = [...updateEvents, {...event, ...eventAddition}];
    }
    return updateEvents;
  }

  async getOnlyOnEveEvents() {
    const events = await this.prisma.events.findMany({
      where: {
        isOnlyOnEve: true,
        deleteAt: null,
        Showing: {
          some: {
            startTime: {
              gte: new Date(),
            },
          },
        }
      },
      select: {
        id: true,
        title: true,
        lastScore: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        totalClicks: true,
        weekClicks: true,
      },
    });
    let updateEvents = [];
    const now = new Date();
    for(const event of events) {
      const showings = await this.prisma.showing.findMany({
        where: {
          eventId: event.id,
          startTime: {
            gte: now,
          },
        },
        select: {
          id: true,
          startTime: true,
          TicketType: {
            select: {
              price: true,
              id: true,
            }
          }
        },
      });
      const eventAddition = await this.caculateEvents(showings);
      updateEvents = [...updateEvents, {...event, ...eventAddition}];
    }
    return updateEvents;
  }

  async getSpecialEventsByCategory() {
    // Lấy tất cả categories
    const categories = await this.prisma.categories.findMany();

    // Tạo response chứa danh sách các sự kiện "special" theo từng category
    const categorySpecials = [];

    for (const category of categories) {
      // Lấy tất cả sự kiện có isSpecial = true cho từng category
      const specialEvents = await this.prisma.eventCategories.findMany({
        where: {
          categoryId: category.id,
          isSpecial: true,
          Events: {
            deleteAt: null,
            Showing: {
              some: {
                startTime: {
                  gte: new Date(),
                },
              },
            }
          },
        },
        select: {
          Categories: {
            select: {
              id: true,
              name: true,
            },
          },
          Events: {
            select: {
              id: true,
              title: true,
              lastScore: true,
              Images_Events_imgLogoIdToImages: true,
              Images_Events_imgPosterIdToImages: true,
              totalClicks: true,
              weekClicks: true,
            },
          },
        },
      });

      // Nếu có sự kiện special cho category này thì thêm vào kết quả
      if (specialEvents.length > 0) {
        let updateEvents = [];
        const now = new Date();
        for(const specialEvent of specialEvents) {
          const showings = await this.prisma.showing.findMany({
            where: {
              eventId: specialEvent.Events.id,
              startTime: {
                gte: now,
              },
            },
            select: {
              id: true,
              startTime: true,
              TicketType: {
                select: {
                  price: true,
                  id: true,
                }
              }
            },
          });
          const eventAddition = await this.caculateEvents(showings);
          updateEvents = [...updateEvents, {...specialEvent.Events, ...eventAddition}];
        }
        categorySpecials.push({
          category: category,
          events: updateEvents,
        });
      }
    }

    return categorySpecials;
  }

  async getTrendingEvents() {
    const now = new Date();
  
    // Tính số ngày từ Thứ Hai đến hiện tại
    const daysSinceMonday = now.getDay() === 0 ? 6 : now.getDay() - 1; // 0 là Chủ Nhật, nên đổi thành 6
  
    // Lấy dữ liệu từ Prisma
    const events = await this.prisma.events.findMany({
      where: {
        deleteAt: null,
        Showing: {
          some: {
            startTime: {
              gte: now,
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        lastScore: true,
        Images_Events_imgLogoIdToImages: true,
        Images_Events_imgPosterIdToImages: true,
        weekClicks: true,
        totalClicks: true,
      },
    });
  
    // Tính toán và sắp xếp
    const trendingEvents = events
      .map(event => {
        const calculatedScore = event.weekClicks / (daysSinceMonday + 1); // Tránh chia cho 0
        const maxScore = Math.max(Number(event.lastScore), calculatedScore); // Lấy điểm lớn hơn giữa lastScore và calculatedScore
        return {
          ...event,
          calculatedScore,
          maxScore,
        };
      })
      .sort((a, b) => b.maxScore - a.maxScore) // Sắp xếp theo maxScore giảm dần
      .slice(0, 20); // Lấy 20 sự kiện có điểm cao nhất
    
    let updateTrendingEvents = [];
    for(const event of trendingEvents) {
      const showings = await this.prisma.showing.findMany({
        where: {
          eventId: event.id,
          startTime: {
            gte: now,
          },
        },
        select: {
          id: true,
          startTime: true,
          TicketType: {
            select: {
              price: true,
              id: true,
            }
          }
        },
      });
      const eventAddition = await this.caculateEvents(showings);
      updateTrendingEvents = [...updateTrendingEvents, {...event, ...eventAddition}];
    }
    return updateTrendingEvents;
  }

  async caculateEvents(showings: any[]) {
    let nowDate = new Date();
    let startTime = new Date("9999-12-31T23:59:59.999Z");
    let minTicketPrice = Number.MAX_VALUE;

    let updatedShowings = [];

    for (const showing of showings) {
        const showingStatus = await this.getEventDetailRepository.getShowingStatus(showing.id);

        if (new Date(showing.startTime) < startTime && showing.startTime > nowDate) {
            startTime = new Date(showing.startTime);
        }

        showing.TicketType.forEach(ticketType => {
            if (ticketType.price < minTicketPrice) {
                minTicketPrice = ticketType.price;
            }
        });

        updatedShowings.push({
            ...showing,
            type: showing.status,
            status: showingStatus.showingStatus,
            TicketType: showing.TicketType.map(ticketType => ({
                ...ticketType,
                status: showingStatus.ticketTypesStatus[ticketType.id] || "sold_out"
            }))
        });
    }

    const eventStatus = this.getEventDetailRepository.calculateEventStatus(updatedShowings);

    return {
        startTime,
        minTicketPrice,
        status: eventStatus,
    };
  }
}
