import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";

@Injectable()
export class GetOrdersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getOrders(showingId: string, organizerId: string): Promise<Result<any[], Error>> {
    try{
      const tickets = await this.prisma.ticket.findMany({
        where: {
          showingId: showingId,
          Showing: {
            deleteAt: null,
            Events: {
              // organizerId: organizerId,
              deleteAt: null,
            }
          }
        },
        select: {
          id: true,
          status: true,
          price: true,
          type: true,
          mailSent: true,
          showingId: true,
          // userId: true,
          FormResponse: {
            select: {
              FormAnswer: {
                select: {
                  value: true,
                  FormInput: {
                    select: {
                      fieldName: true,
                      options: true,
                    }
                  }
                }
              }
            }
          },
          PaymentInfo: {
            select: {
              id: true,
              paidAt: true,
              OrderInfo: {
                select: {
                  ticketTypeId: true,
                  quantity: true,
                  seatId: true,
                  status: true,
                }
              }
            }
          }
        }
      });
      if (!tickets) {
        return Ok([]);
      }
      return Ok(tickets);
    }
    catch (error) {
      return Err(new Error('Failed to get orders'));
    }
  }

}