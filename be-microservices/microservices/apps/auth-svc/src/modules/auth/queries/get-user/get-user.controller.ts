import {
  Controller,
  Get,
  HttpStatus,
  Request,
  Res,
  Headers,
} from '@nestjs/common';
import { GetUserService } from './get-user.service';
import { ApiTags, ApiOperation, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
// import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { UserResponse } from './get-user.dto';

@ApiTags('User')
@Controller('api/user')
export class GetUserController {
  constructor(private readonly userService: GetUserService) { }

  // @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get Current User Details',
    description: 'Retrieves details of the currently authenticated user'
  })
  // @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'User details fetched successfully',
    type: UserResponse
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing token'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getCurrentUser(
    @Request() req,
    @Res() res: Response,
    @Headers('x-user-email') email: string ,
    @Headers('x-user-role') role: string,
  ) {
    const emailUser = req.user ? req.user.email : email;
    const currentUser = await this.userService.execute(emailUser);

    if (currentUser.isErr()) {
      return res.status(404).json(ErrorHandler.notFound('User not found'));
    }

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'User details fetched successfully',
      data: {
        ...currentUser.unwrap(),
      }
    });
  }
}
// function ApiBearerAuth(arg0: string): (target: GetUserController, propertyKey: "getCurrentUser", descriptor: TypedPropertyDescriptor<(req: any, res: Response, email: string, role: string) => Promise<any>>) => void | TypedPropertyDescriptor<...> {
//   throw new Error('Function not implemented.');
// }

