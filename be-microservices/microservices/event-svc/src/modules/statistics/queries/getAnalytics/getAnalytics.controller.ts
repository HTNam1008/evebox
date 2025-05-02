import { Controller, Get, Res, HttpStatus, UseGuards, Param, Request, Req, Query } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { StatisticsService } from './getAnalytics.service';
import { AnalyticsResponseDto } from './getAnalytics-response.dto';

@ApiTags('Org - Statistics')
@Controller('api/org/statistics')
export class GetAnalyticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('analytic/:eventId')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get event analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully', type: AnalyticsResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAnalytics(
    @Param('eventId') eventIdRaw: string,
    @Request() req,
    @Res() res: Response,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const eventId = parseInt(eventIdRaw, 10);
    if (isNaN(eventId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid eventId' });
    }

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
  
    const userEmail = (req.user as any).email;
  
    const result = await this.statisticsService.getAnalytics(eventId, userEmail, start,end);
    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: result.unwrapErr().message });
    }
  
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Analytics retrieved successfully',
      data: result.unwrap(),
    });
  }
}
