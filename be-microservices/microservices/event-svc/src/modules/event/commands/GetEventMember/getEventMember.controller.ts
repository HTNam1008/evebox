import { Controller, Query, Req, ForbiddenException, UseGuards, BadRequestException, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { Request } from 'express';
import { GetEventMembersQueryDto } from '../../queries/getEventMember/getEventMembers.query.dto';
import { GetEventMembersService } from './getEventMembers.service';

@Controller('org/member')
export class GetEventMemberController {
  constructor(private readonly service: GetEventMembersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':eventId')
  async getMembers(
    @Param('eventId') eventIdRaw: string,
    @Query() query: GetEventMembersQueryDto,
    @Req() req: Request
  ) {
    const eventId = parseInt(eventIdRaw, 10);
    if (isNaN(eventId)) throw new BadRequestException('Invalid eventId');
    return this.service.execute(eventId, (req.user as any).email, query);
  }
}
