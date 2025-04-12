import { Controller, Query, Body, Req, UseGuards, BadRequestException, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { Request } from 'express';
import { UpdateEventMemberService } from './updateEventMember.service';
import { UpdateEventMemberDto } from './updateEventMember.dto';

@Controller('org/member')
export class UpdateEventMemberController {
  constructor(private readonly updateService: UpdateEventMemberService,) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateMember(@Query('eventId') eventIdRaw: string, @Body() dto: UpdateEventMemberDto, @Req() req: Request) {
    const eventId = parseInt(eventIdRaw, 10);
    if (isNaN(eventId)) throw new BadRequestException('Invalid eventId');
    return this.updateService.execute(eventId, dto, (req.user as any).email);
  }
}
