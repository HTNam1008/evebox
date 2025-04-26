import {
  Controller,
  Body,
  Res,
  Get,
  Patch,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FastifyReply } from 'fastify';
import { firstValueFrom } from 'rxjs';

import { convertToSafeHeaders } from 'src/common/utils/auth.uitls';
import { UserStatusDto } from './dto/user-status.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { BaseController } from 'src/common/utils/base.controller';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('api/admin')
export class AdminController extends BaseController{
  constructor(private readonly httpService: HttpService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/status')
  @Roles(UserRole.ADMIN)
  async updateUserStatus(
    @Body() userStatusDto: UserStatusDto,
    @Res() res: FastifyReply,
    @Param('userId') userId: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(
          `${process.env.ADMIN_SERVICE_URL}/api/admin/${userId}/status`,
          userStatusDto,
        ),
      );

      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @Roles(UserRole.ADMIN)
  async getUsers(
    @Res() res: FastifyReply,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.ADMIN_SERVICE_URL}/api/admin/user?page=${page}&pageSize=${pageSize}`,
        ),
      );

      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return this.handleError(error, res);
    }
  }
}
