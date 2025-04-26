import {
  Controller,
  HttpStatus,
  Res,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { UserStatusDto } from './user-status.dto';
import { UserStatusCommand } from './user-status.command';
import { UserStatusService } from './user-status.service';

@Controller('api/admin')
@ApiTags('Account-Management')
export class UserStatusController {
  constructor(private readonly userStatusService: UserStatusService) {}

  @Patch('/:userId/status')
  @ApiOperation({
    summary: 'Update status user',
    description: 'Update status user by userId',
  })
  @ApiBody({
    description: 'Update status user',
  })
  @ApiOkResponse({
    description: 'Update status user successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Failed to Update status user information',
  })
  async updateUserStatus(@Res() res: Response, 
  @Body() dto: UserStatusDto,
  @Param('userId') userId: string) {
    try {
      if (!userId) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(ErrorHandler.badRequest('User ID is required'));
      }

      if (!dto.status) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(ErrorHandler.badRequest('Status is required'));
      }

      const command = UserStatusCommand.create(dto, userId);
      const result = await this.userStatusService.execute(command);

      if (result.isErr()) {
        const error = result.unwrapErr();

        if (error.message === 'User not found') {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json(ErrorHandler.notFound('User not found'));
        }

        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(ErrorHandler.badRequest(error.message));
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Update status user successfully',
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          ErrorHandler.internalServerError(
            'Failed to Update status user information',
          ),
        );
    }
  }
}
