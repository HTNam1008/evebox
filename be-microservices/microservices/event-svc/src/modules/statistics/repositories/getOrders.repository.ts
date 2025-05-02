import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { TicketOrderData } from "../queries/getOrders/getOrders-response.dto";

@Injectable()
export class GetOrdersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getOrders(showingId: string, organizerId: string): Promise<Result<TicketOrderData[], Error>> {
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

  async getEventById(eventId: number) {
    return this.prisma.events.findUnique({
      where: { id: eventId },
      select: { id: true, organizerId: true },
    });
  }

  async getEventByShowingId(showingId: string) {
    return this.prisma.showing.findUnique({
      where: { id: showingId },
      select: { id: true, eventId: true },
    });
  }

  async getMember(eventId: number, userId: string) {
    return this.prisma.eventUserRelationship.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });
  }

   async hasPermissionToManageMembers(showingId: string, userEmail: string): Promise<boolean> {
      // Step 1: Get the user by email
      const user = await this.prisma.user.findUnique({
        where: { email: userEmail },
      });

      const eventId = await this.getEventByShowingId(showingId)
    
    
      if (!user) {
        throw new NotFoundException(`User with email ${userEmail} not found`);
      }
    
      // Step 2: Check if this user is the organizer of the event (they always have permission)
      const event = await this.getEventById(eventId.eventId);
      if (event?.organizerId === user.email) {
        return true;
      }
    
      // Step 3: Get user’s role in the event
      const member = await this.getMember(eventId.eventId, user.id);
      if (!member || member.isDeleted) {
        return false;
      }
    
      // Step 4: Lookup the role’s permissions in event_role table
      const role = await this.prisma.eventRole.findUnique({
        where: { id: member.role },
      });
    
      if (!role) {
        return false;
      }
    
      // Step 5: Return permission flag
      return role.viewOrder;
    }

}