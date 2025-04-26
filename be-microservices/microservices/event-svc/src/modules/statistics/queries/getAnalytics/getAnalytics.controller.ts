import { Controller, Get, Res, HttpStatus, UseGuards, Param, Request, Req } from '@nestjs/common';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { StatisticsService } from './getAnalytics.service';
import { AnalyticsResponseDto } from './getAnalytics-response.dto';

@ApiTags('Org - Statistics')
@Controller('api/org/statistics')
export class GetAnalyticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('analytic/:eventId')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiOperation({ summary: 'Get event analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully', type: AnalyticsResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAnalytics(
    @Param('eventId') eventIdRaw: string,
    @Request() req,
    @Res() res: Response,
  ) {
    const eventId = parseInt(eventIdRaw, 10);
    if (isNaN(eventId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid eventId' });
    }
  
    const userEmail = (req.user as any).email;
  
    const result = await this.statisticsService.getAnalytics(eventId, userEmail);
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
