import { HttpLoggerMiddleware } from './http-logger.middleware';

describe('HttpLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new HttpLoggerMiddleware()).toBeDefined();
  });
});
