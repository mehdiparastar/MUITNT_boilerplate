import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown & { message?: string }, host: ArgumentsHost): void {
    // console.log(exception)

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof QueryFailedError
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      msg: exception.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
