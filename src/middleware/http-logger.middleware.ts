import { Injectable, NestMiddleware, Logger, Inject, LoggerService } from '@nestjs/common';
import { AppRequest, AppResponse } from '../interface/user-id.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {

  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerWinston: LoggerService) { }

  use(req: AppRequest<any>, res: AppResponse<any>, next: () => void) {

    try {

      const message = {
        ip: req.ip,
        protocol: req.protocol,
        method: req.method,
        params: req.params,
        query: req.query,
        httpVersion: req.httpVersion,
        path: req.path,
        baseUrl: req.baseUrl,
        headers: req.headers,
        body: req.body
      }
      this.loggerWinston.log(message, 'HttpRequest');
    } catch(err) {
      this.logger.error(err)
    }

    next();
  }
}
