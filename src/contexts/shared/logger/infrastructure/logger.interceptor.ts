import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { Observable, tap } from "rxjs";

import { Injectable } from "@/shared/dependency-injection/injectable";
import { Logger } from "@/shared/logger/domain";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const type = context.getType();

    switch (type) {
      case "http": {
        return this.logHttp(context, next);
      }
      default:
    }

    return next.handle();
  }

  private logHttp(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    this.logger.info("Incoming http request", {
      attributes: {
        http: {
          url: req.url,
          method: req.method,
          urlQuery: req.query,
          userAgent: req.headers["user-agent"],
        },
        attributes: {
          request: {
            body: req.body,
            params: req.params,
          },
        },
      },
    });

    return next.handle().pipe(
      tap({
        next: data => {
          const res = context.switchToHttp().getResponse<FastifyReply>();
          this.logger.info("Finishing http request", {
            attributes: {
              http: {
                statusCode: res.statusCode,
              },
              request: {
                response: data,
              },
            },
          });
        },
        error: (error: unknown) => {
          this.logError("Finishing http request with error", error);
        },
      }),
    );
  }

  private logError(body: string, error: unknown) {
    const exceptionAttributes =
      error instanceof Error
        ? {
            message: error.message,
            type: error.name,
            stacktrace: error.stack,
          }
        : undefined;

    this.logger.error(body, {
      attributes: {
        exception: exceptionAttributes,
      },
    });
  }
}
