import { Injectable, LoggerService } from '@nestjs/common';
import { InjectWinstonLoggerService } from '../decorators/inject-winston-logger-service.decorator';

@Injectable()
export class LoggerHelperService {
  constructor(
    @InjectWinstonLoggerService()
    private readonly loggerService: LoggerService
  ) {}

  /**
   * 建立有冠上領域名稱的 `Logger`
   * @param name 領域名稱，如：CopAccount、Image 等等
   */
  makeCreator(name?: string): TrackerLoggerCreator {
    return new TrackerLoggerCreator(this.loggerService, name);
  }
}

/**
 * 封裝 `trackingId` 的建立者。
 * 此類別會先初步封裝來自外部的 `LoggerService` 以及領域名稱
 */
export class TrackerLoggerCreator {
  /**
   * @param loggerService 來自外部的 `LoggerService`
   * @param name 領域名稱，如：CopAccount、Image 等等
   */
  constructor(private readonly loggerService: LoggerService, private readonly name: string) {}

  create(trackingId: string) {
    return new TrackerLogger(this.loggerService, this.name, trackingId);
  }
}

/**
 * 原則上經由 `TrackerLoggerCreator` 帶入 `trackingId` 並建成可用的 `Logger`
 */
export class TrackerLogger implements LoggerService {
  /**
   * @param loggerService 來自外部的 LoggerService
   * @param name 領域名稱，如：CopAccount、Image 等等
   */
  constructor(
    private readonly loggerService: LoggerService,
    private readonly name: string,
    private readonly _trackingId: string
  ) {}

  get trackingId(): string {
    return this._trackingId;
  }

  /**
   * 為訊息冠上領域名稱前綴與追蹤 Id
   * @param message 訊息
   */
  private createMessage = (message: any) => {
    return {
      trackingId: this.trackingId,
      message: `${this.name}: ${message}`,
    };
  };

  log = (message: any, context?: string) => {
    this.loggerService.log(this.createMessage(message), context);
  };

  error = (message: any, trace?: string, context?: string) => {
    this.loggerService.error(this.createMessage(message), trace, context);
  };

  warn = (message: any, context?: string) => {
    this.loggerService.warn(this.createMessage(message), context);
  };

  debug? = (message: any, context?: string) => {
    this.loggerService.debug(this.createMessage(message), context);
  };

  verbose? = (message: any, context?: string) => {
    this.loggerService.verbose(this.createMessage(message), context);
  };
}
