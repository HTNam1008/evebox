import { Controller, Post, Res, UseGuards, HttpStatus, Request, Req, Body } from '@nestjs/common';
import { LogoutUserService } from './logout-user.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { LogoutResponse, LogoutUserDto } from './logout-user.dto';
import { USER_MESSAGES } from 'src/shared/constants/constants';
import { LogoutUserCommand } from './logout-user.command';

@Controller('api/user')
@ApiTags('Authentication')
export class LogoutUserController {
  constructor(private readonly logoutService: LogoutUserService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ 
    summary: 'User logout',
    description: 'Invalidate user session and revoke refresh token'
  })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'User logged out successfully',
    type: LogoutResponse
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing token'
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error while logging out'
  })
  async logout(@Body() logoutUserDto: LogoutUserDto, @Res() res: Response) {
    try {
      const command = new LogoutUserCommand(logoutUserDto.email, logoutUserDto.role_id);
      // Call service with token
      await this.logoutService.execute(command);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: USER_MESSAGES.SUCCESS.LOGOUT,
        data: null
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ErrorHandler.internalServerError(USER_MESSAGES.ERRORS.SERVER_ERROR));
    }
  }
}
