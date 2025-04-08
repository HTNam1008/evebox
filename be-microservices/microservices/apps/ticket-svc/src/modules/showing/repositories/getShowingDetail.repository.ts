import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import e from 'express';

@Injectable()
export class getShowingDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getShowingDetail(showingId: string) {
    // console.log("getShowingDetail" + showingId);
    const showing = await this.prisma.showing.findUnique({
      where: {
        id: showingId,
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
        Form: {
          select: {
            id: true,
            name: true,
            FormInput: {
              select: {
                id: true,
                formId: true,
                fieldName: true,
                type: true,
                required: true,
                regex: true,
                options: true,
              },
            },
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
    });

    if (!showing) {
      return null;
    }

    const showingStatus = await this.getShowingStatus(showingId);
    // console.log(showingStatus);

    // // Lặp qua từng ticketType và gán status tương ứng
    // showing.TicketType = showing.TicketType.map(ticketType => ({
    //   ...ticketType, // Sao chép toàn bộ dữ liệu cũ
    //   status: showingStatus.ticketTypesStatus[ticketType.id] || "sold_out" // Gán status (mặc định là "sold_out" nếu không tìm thấy)
    // }));

    const showingFormatted = {
      id: showing.id,
      eventId: showing.eventId,
      status: showingStatus.showingStatus,
      isFree: showing.isFree,
      isSalable: showing.isSalable,
      isPresale: showing.isPresale,
      seatMapId: showing.seatMapId,
      startTime: showing.startTime,
      endTime: showing.endTime,
      isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
      showAllSeats: showing.showAllSeats,
      Form: showing.Form,
      Events: showing.Events,
      TicketType: showing.TicketType.map(ticketType => ({
        id: ticketType.id,
        name: ticketType.name,
        description: ticketType.description,
        color: ticketType.color,
        isFree: ticketType.isFree,
        price: ticketType.price,
        originalPrice: ticketType.originalPrice,
        maxQtyPerOrder: ticketType.maxQtyPerOrder,
        minQtyPerOrder: ticketType.minQtyPerOrder,
        startTime: ticketType.startTime,
        endTime: ticketType.endTime,
        position: ticketType.position,
        imageUrl: ticketType.imageUrl,
        isHidden: ticketType.isHidden,
        status: showingStatus.ticketTypesStatus[ticketType.id] || "sold_out",
        }),
      ),
    }

    return showingFormatted;
  }
  async getShowingStatus(showingId: string) {
    try{
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
  async getTicketTypeStatus(seatMapId:number, ticketTypeId: string) {
    try{
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
      if(ticketTypeQuantity.startTime && ticketTypeQuantity.startTime > date){
        return "not_open";
      }
      else if (ticketTypeQuantity.endTime && ticketTypeQuantity.endTime < date){
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
      if(!seatSection || seatSection.length === 0){
        const ticketSold = await this.prisma.ticketQRCode.count({
          where: {
            ticketTypeId: ticketTypeId,
          },
        });
        
        if(ticketSold >= ticketTypeQuantity.quantity){
          return "sold_out";
        }
        else{
          return ticketTypeQuantity.price == 0 ? "register_now" : "book_now";
        }
      }
      const sectionIdInTicketType = ticketTypeQuantity.sections.map(section => section.sectionId);
      for (const section of seatSection) {
        if(sectionIdInTicketType.includes(section.id)){
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
    catch(error){
      console.log(error);
      return "sold_out";
    }
  }
}