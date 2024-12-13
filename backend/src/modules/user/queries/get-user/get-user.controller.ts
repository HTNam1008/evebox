import {
    Controller,
    Get,
    Headers,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { GetUserService } from '../get-user/get-user.service';
  import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
  import * as jwt from 'jsonwebtoken';
  
  @ApiTags('User')
  @Controller('api/user')
  export class GetUserController {
    private readonly jwtSecret = process.env.JWT_SECRET;
    constructor(private readonly userService: GetUserService) {}
  
    @Get('me')
    @ApiOperation({ summary: 'Get Current User Details' })
    @ApiHeader({
      name: 'Authorization',
      description: 'Bearer token for authorization (`Bearer <token>`)',
      required: true,
    })
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'User Not Found' })
    async getCurrentUser(@Headers('Authorization') authHeader: string) {
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new HttpException('Token missing or malformed', HttpStatus.UNAUTHORIZED);
      }
  
      const token = authHeader.split(' ')[1];
      const user = this.decodeToken(token); // Mock decoding for simplicity
      console.log(user)
      const currenUser = await this.userService.getCurrentUser(user.email);
  
      if (!user) {
        throw new HttpException('Usser Not Found', HttpStatus.NOT_FOUND);
      }
  
      return currenUser.toJSON();
    }
  
    decodeToken(token: string): { email: string; role: number } {
      try {
        const decoded = jwt.verify(token, this.jwtSecret) as {
          email: string;
          role: number;
          iat: number;
          exp: number;
        };
  
        if (!decoded || !decoded.email || !decoded.role) {
          throw new HttpException('Invalid token structure', HttpStatus.UNAUTHORIZED);
        }
  
        return { email: decoded.email, role: decoded.role };
      } catch (error) {
        throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
      }
    }
  }
  