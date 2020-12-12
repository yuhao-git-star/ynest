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
          ApiResponseService.generateResponse(exception.getResponse(), exception.message, false, status, 0)
        );
    } catch(err) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          ApiResponseService.generateResponse(err, exception.message, false, HttpStatus.INTERNAL_SERVER_ERROR, 0)
        );
    }
  }
}
