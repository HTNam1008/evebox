import {
  Controller,
  Get,
  HttpStatus,
  Res,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Response } from 'express';
import { GetUsersService } from './get-users.service';

@ApiTags('User-Management')
@Controller('api/admin/user')
export class GetUserController {
  constructor(private readonly getUsersService: GetUsersService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiOperation({
    summary: 'Get users',
    description: 'Get users with pagination',
  })
  @ApiOkResponse({
    description: 'Get users successfully',
  })
  @ApiNotFoundResponse({
    description: 'Users not found',
  })
  async getUsers(
    @Res() res: Response,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    if (page < 1 || pageSize < 1) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const users = await this.getUsersService.execute(page, pageSize);

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Get users successfully',
      data: {
        ...users.unwrap(),
      },
    });
  }
}
