import { Controller, Post, Query, Body, Req, ForbiddenException, UseGuards, BadRequestException } from '@nestjs/common';
import { AddEventMemberService } from './addEventMember.service';
import { AddEventMemberDto } from './addEventMember.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('org/member')
export class AddEventMemberController {
  constructor(private readonly service: AddEventMemberService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addMember(
    @Query('eventId') eventIdRaw: string,
    @Body() dto: AddEventMemberDto,
    @Req() req: Request,
  ) {
    const eventId = parseInt(eventIdRaw, 10);
    if (isNaN(eventId)) {
      throw new BadRequestException('Invalid eventId');
    }
    
    const user = req.user as { email: string };
    return this.service.execute(eventId, dto, user.email);
  }
}
