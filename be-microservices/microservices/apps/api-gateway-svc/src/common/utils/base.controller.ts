import { ForbiddenException, Logger } from "@nestjs/common";
import { FastifyReply } from 'fastify';

export class BaseController {
    handleError(error: any, res: FastifyReply) {
      Logger.error('Error occurred in gateway:', error);
      if (error instanceof ForbiddenException) {
        return res.status(403).send({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden'
        });
      }
  
      const statusCode = error.response?.status || 500;
      const errorData = error.response?.data || {
        message: 'Internal server error',
        error: 'GatewayError',
        statusCode: 500,
      };
  
      return res
        .status(statusCode)
        .headers(error.response?.headers || {})
        .send(errorData);
    }
  }