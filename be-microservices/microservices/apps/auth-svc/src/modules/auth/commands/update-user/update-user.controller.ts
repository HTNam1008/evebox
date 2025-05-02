import { Controller, Body, HttpStatus, Res, Patch, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { UpdateUserDto } from './update-user.dto';
import { UpdateUserCommand } from './update-user.command';
import { UpdateUserService } from './update-user.service';

@Controller('api/user')
@ApiTags('Authentication')
export class UpdateUserController {
  constructor(
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Patch('me')
  @ApiOperation({ 
    summary: 'Update information user',
    description: 'Update user information such as name and phone number'
  })
  @ApiBody({ type: UpdateUserDto})
  @ApiOkResponse({
    description: 'Update user successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  @ApiInternalServerErrorResponse({
    description: 'Failed to update user information'
  })
  async updateUser(
    @Body() dto: UpdateUserDto, 
    @Res() res: Response,
    @Headers('X-User-Email') email: string ,
    @Headers('X-User-Role') role: string,
    ) {
    try {
      if (!email) {
        return res
        .status(HttpStatus.NOT_FOUND)
        .json(ErrorHandler.notFound('User not found'));
      }

      console.log("avatar_id", dto.avatar_id);
      const command = new UpdateUserCommand(
        dto.name,
        dto.phone,
        dto.avatar_id,
        email
      );

      const result = await this.updateUserService.execute(command);
      
      if (result.isErr()) {
        const error = result.unwrapErr();
        
        if (error.message === 'User not found') {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json(ErrorHandler.notFound('User not found'));
        }
        
        if (error.message === 'Invalid input data') {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(ErrorHandler.badRequest('Invalid input data'));
        }
    
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(ErrorHandler.badRequest(error.message));
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Update user successfully',
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ErrorHandler.internalServerError('Failed to update user information'));
    }
  } 
}