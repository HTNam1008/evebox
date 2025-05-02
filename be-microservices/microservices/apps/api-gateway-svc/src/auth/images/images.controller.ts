/* Package system */
import {
  Controller,
  Post,
  Res,
  UseGuards,
  Request,
  Get,
  Headers,
  Param,
  Put,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FastifyReply } from 'fastify';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';

/* Package Application */
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { convertToSafeHeaders } from 'src/common/utils/auth.uitls';

@Controller('api/images')
export class ImageController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  async uploadImage(@Request() req, @Res() res: FastifyReply) {
    try {
      const data = await req.file();
      if (!data) {
        return res.status(400).send({ message: 'No file uploaded' });
      }

      const formData = new FormData();
      const buffer = await data.toBuffer(); 

      formData.append('file', buffer, {
        filename: data.filename,
        contentType: data.mimetype,
      });

      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTH_SERVICE_URL}/api/images/upload`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              'X-User-Email': req.user.email,
              'X-User-Role': req.user.role,
            },
          },
        ),
      );

      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllImages(
    @Request() req,
    @Res() res: FastifyReply,
    @Headers() headers: Record<string, string>,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${process.env.AUTH_SERVICE_URL}/api/images`, {
          headers: {
            ...headers,
            'X-User-Email': req.user.email,
            'X-User-Role': req.user.role,
          },
        }),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getImage(
    @Request() req,
    @Res() res: FastifyReply,
    @Headers() headers: Record<string, string>,
    @Param('id') id: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.AUTH_SERVICE_URL}/api/images/${id}`,
          {
            headers: {
              ...headers,
              'X-User-Email': req.user.email,
              'X-User-Role': req.user.role,
            },
          },
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateImage(
    @Request() req,
    @Res() res: FastifyReply,
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: Record<string, string>,
    @Param('id') id: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(
          `${process.env.AUTH_SERVICE_URL}/api/images/${id}`,
          {
            headers: {
              ...headers,
              'X-User-Email': req.user.email,
              'X-User-Role': req.user.role,
            },
            data: file,
          },
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async removeImage(
    @Request() req,
    @Res() res: FastifyReply,
    @Headers() headers: Record<string, string>,
    @Param('id') id: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(
          `${process.env.AUTH_SERVICE_URL}/api/images/${id}`,
          {
            headers: {
              ...headers,
              'X-User-Email': req.user.email,
              'X-User-Role': req.user.role,
            },
          },
        ),
      );

      // Convert headers to a compatible format
      const safeHeaders = convertToSafeHeaders(response.headers);

      return res
        .status(response.status)
        .headers(safeHeaders)
        .send(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || { message: 'Internal server error' });
    }
  }
}
