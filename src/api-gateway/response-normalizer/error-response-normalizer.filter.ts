import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import { FastifyReply } from "fastify";

@Catch()
export class ErrorResponseNormalizerFilter implements ExceptionFilter {
  async catch(rawException: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<FastifyReply>();

    const exception =
      rawException instanceof HttpException
        ? rawException
        : new InternalServerErrorException();

    const status = exception.getStatus();

    await response.status(status).send({ error: this.mapToError(exception) });
  }

  private mapToError(error: HttpException) {
    return {
      message: error.message,
      status: error.getStatus(),
      reasons: this.getReasons(error),
    };
  }

  private getReasons(error: HttpException): string[] | undefined {
    if (!(error instanceof BadRequestException)) {
      return;
    }

    const response = error.getResponse() as { message?: string[] };
    return response?.message || [];
  }
}
