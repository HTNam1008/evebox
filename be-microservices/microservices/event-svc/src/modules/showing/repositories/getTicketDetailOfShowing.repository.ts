import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { TicketTypeDetailData } from "../queries/getTicketDetailOfShowing/getTicketDetailOfShowing-response.dto";

@Injectable()
export class GetTicketDetailOfShowingRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getTicketDetailOfShowing(showingId: string, ticketTypeId: string, email: string): Promise<Result<TicketTypeDetailData, Error>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user || user.role_id !== 1) {
        return Err(new Error('You do not have permission to get organizer revenue'));
      }

      const showingDetail = await this.prisma.showing.findUnique({
        where: { id: showingId },
        select: {
          id: true,
          eventId: true,
          startTime: true,
          endTime: true,
          seatMapId: true,
          Events: {
            select: {
              id: true,
              title: true,
            },
          },
          TicketType: {
            where: { id: ticketTypeId },
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              maxQtyPerOrder: true,
              minQtyPerOrder: true,
              quantity: true,
              imageUrl: true,
              startTime: true,
              endTime: true
            },
          },
        },
      });

      if (!showingDetail) {
        return Err(new Error('No ticket of showing found'));
      }

      const ticketSold = await this.prisma.ticketQRCode.count({
        where: {
          ticketTypeId: { in: showingDetail.TicketType.map(tt => tt.id) },
          isCheckedIn: true,
        },
      });

      const showingStatus = await this.getShowingStatus(showingId);

      const ticketFormatted = {
        id: showingDetail.TicketType[0].id,
        name: showingDetail.TicketType[0].name,
        description: showingDetail.TicketType[0].description,
        price: showingDetail.TicketType[0].price,
        maxQtyPerOrder: showingDetail.TicketType[0].maxQtyPerOrder,
        minQtyPerOrder: showingDetail.TicketType[0].minQtyPerOrder,
        startTime: showingDetail.TicketType[0].startTime,
        endTime: showingDetail.TicketType[0].endTime,
        imageUrl: showingDetail.TicketType[0].imageUrl,
        quantity: showingDetail.TicketType[0].quantity,
        sold: ticketSold,
        status: showingStatus.ticketTypesStatus[showingDetail.TicketType[0].id] || "sold_out",
      }

      const showingFormatted = {
        id: showingDetail.id,
        startTime: showingDetail.startTime,
        endTime: showingDetail.endTime,
        event: {
          id: showingDetail.Events.id,
          title: showingDetail.Events.title
        },
        ticketType: ticketFormatted,
      }

      return Ok(showingFormatted);
    } catch (error) {
      return Err(new Error('Failed to get summary of ticket revenue'));
    }
  }

  async getShowingStatus(showingId: string) {
    try {
      const showing = await this.prisma.showing.findUnique({
        where: {
          id: showingId,
        },
        select: {
          TicketType: {
            select: {
              id: true,
            }
          },
          seatMapId: true,
        },
      });
      let showingStatus = "sold_out"; // Mặc định là sold_out
      const ticketTypesStatus = {}; // Lưu trạng thái từng ticketType

      for (const ticketType of showing.TicketType) {
        const ticketTypeStatus = await this.getTicketTypeStatus(showing.seatMapId, ticketType.id);
        ticketTypesStatus[ticketType.id] = ticketTypeStatus; // Lưu trạng thái từng ticketType

        // Cập nhật showingStatus theo thứ tự ưu tiên
        if (ticketTypeStatus === "register_now") {
          showingStatus = "register_now";
        } else if (ticketTypeStatus === "book_now" && showingStatus === "sold_out") {
          showingStatus = "book_now";
        } else if (ticketTypeStatus === "not_open" && ["sold_out", "book_now"].includes(showingStatus)) {
          showingStatus = "not_open";
        } else if (ticketTypeStatus === "register_closed" && ["sold_out", "book_now", "not_open"].includes(showingStatus)) {
          showingStatus = "register_closed";
        }
      }

      // Return kết quả
      return { ticketTypesStatus, showingStatus };

    }
    catch (error) {
      // throw new Error(error);
      console.log(error);
      return null;
    }
  }
  async getTicketTypeStatus(seatMapId: number, ticketTypeId: string) {
    try {
      const ticketTypeQuantity = await this.prisma.ticketType.findUnique({
        where: {
          id: ticketTypeId,
        },
        select: {
          showingId: true,
          quantity: true,
          price: true,
          startTime: true,
          endTime: true,
          sections: {
            select: {
              sectionId: true,
            }
          }
        },
      });

      const date = new Date();
      if (ticketTypeQuantity.startTime && ticketTypeQuantity.startTime > date) {
        return "not_open";
      }
      else if (ticketTypeQuantity.endTime && ticketTypeQuantity.endTime < date) {
        return ticketTypeQuantity.price == 0 ? "register_closed" : "sale_closed";
      }

      const seatmap = await this.prisma.seatmap.findFirst({
        where: {
          id: seatMapId,
        },
        select: {
          id: true,
          Section: {
            select: {
              id: true,
              Row: {
                select: {
                  Seat: {
                    select: {
                      SeatStatus: true,
                    }
                  }
                },
              }
            }
          },
        },
      });
      if (!seatmap) {
        return "sold_out";
      }

      const seatSection = seatmap.Section;
      if (!seatSection || seatSection.length === 0) {
        const ticketSold = await this.prisma.ticketQRCode.count({
          where: {
            ticketTypeId: ticketTypeId,
          },
        });

        if (ticketSold >= ticketTypeQuantity.quantity) {
          return "sold_out";
        }
        else {
          return ticketTypeQuantity.price == 0 ? "register_now" : "book_now";
        }
      }
      const sectionIdInTicketType = ticketTypeQuantity.sections.map(section => section.sectionId);
      for (const section of seatSection) {
        if (sectionIdInTicketType.includes(section.id)) {
          continue;
        }
        const rows = section.Row;
        for (const row of rows) {
          const seats = row.Seat;
          for (const seat of seats) {
            for (const status of seat.SeatStatus) {
              if (status.showingId === ticketTypeQuantity.showingId
                && status.status === 1
              ) {
                return ticketTypeQuantity.price == 0 ? "register_now" : "book_now";
              }
            }
          }
        }
      }
      return "sold_out";
    }
    catch (error) {
      console.log(error);
      return "sold_out";
    }
  }
}