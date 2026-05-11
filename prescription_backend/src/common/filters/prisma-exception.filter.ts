import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.BAD_REQUEST;
    let message = 'Une erreur est survenue.';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'Un enregistrement avec ces données existe déjà.';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'L\'enregistrement demandé n\'existe pas.';
        break;
      default:
        message = exception.message;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
