import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GetAllLocationsService } from './getAllLocation.service';
import { GetAllLocationsResponseDto } from './getAllLocation-response.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';

@ApiTags('Location')
@Controller('api')
export class GetAllLocationsController {
  constructor(private readonly getAllLocationsService: GetAllLocationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/location/all')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all locations with district and province names' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Locations retrieved successfully',
    type: GetAllLocationsResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findAll(@Req() req: any, @Res() res: Response) {
    const user = req.user.email;  
    try {
      const result = await this.getAllLocationsService.getAllLocations(user);
      return res.status(HttpStatus.OK).json(result.unwrap());
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
