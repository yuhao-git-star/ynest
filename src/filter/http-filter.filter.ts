import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseService } from '../api-response/api-response.service';

@Catch()
export class HttpFilterFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    try {
      const status = exception.getStatus();

      response
        .status(status)
        .json(
          ApiResponseService.generateResponse(null, exception.message, false, status, 0)
        );
    } catch {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          ApiResponseService.generateResponse(null, exception.message, false, HttpStatus.INTERNAL_SERVER_ERROR, 0)
        );
    }
  }
}
