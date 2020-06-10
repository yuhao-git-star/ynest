import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { AppRequest } from '../interface/user-id.interface';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {

  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  use(req: AppRequest<any>, res: any, next: () => void) {
    this.logger.debug({
      url: req.url,
      headers: req.headers,
      body: req.body
    }, 'HttpRequest');

    next();
  }
}
