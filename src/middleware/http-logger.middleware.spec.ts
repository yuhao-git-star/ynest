import { HttpLoggerMiddleware } from './http-logger.middleware';
import { Logger } from '@nestjs/common';

describe('HttpLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new HttpLoggerMiddleware(new Logger())).toBeDefined();
  });
});
