import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Param,
} from '@nestjs/common';
import { GetUserByIdService } from './get-user-by-id.service';
import { ApiTags, ApiOperation, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { UserResponse } from './get-user-by-id.dto';

@ApiTags('User')
@Controller('api/user')
export class GetUserByIdController {
  constructor(private readonly userService: GetUserByIdService) { }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Fetch user details by ID'
  })
  @ApiOkResponse({
    description: 'User details fetched successfully',
    type: UserResponse
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const userData = await this.userService.execute(id);

    if (userData.isErr()) {
      return res.status(404).json(ErrorHandler.notFound('User not found'));
    }

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'User details fetched successfully',
      data: {
        ...userData.unwrap(),
      }
    });
  }
}
