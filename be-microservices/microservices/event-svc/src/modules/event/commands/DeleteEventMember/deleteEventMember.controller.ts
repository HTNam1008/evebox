import { Controller, Query, Req, ForbiddenException, UseGuards, BadRequestException, Get, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { Request } from 'express';
import { DeleteEventMemberService } from './deleteEventMember.service';

@Controller('org/member')
export class DeleteEventMemberController {
  constructor(private readonly service: DeleteEventMemberService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':eventId')
  async deleteMember(
    @Param('eventId') eventIdRaw: string,
    @Query('email') email: string,
    @Req() req: Request,
  ) {
    const eventId = parseInt(eventIdRaw, 10);
    if (isNaN(eventId)) throw new BadRequestException('Invalid eventId');
    if (!email) throw new BadRequestException('Email query param is required');
  
    return this.service.execute(eventId, (req.user as any).email, email);
  }
}
