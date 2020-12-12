import { LoggerService } from '@nestjs/common';

// Reset all
export function mockClearAll() {
  // Reset mockedLogger
  Object.values(innerMockedLogger).forEach(m => m.mockClear());

  // Reset LoggerHelperService
  mockedLoggerHelperSerivceMakeCreator.mockClear();
  LoggerHelperService.mockClear();

  // Reset TrackerLoggerCreator
  mockedTrackerLoggerCreatorCreate.mockClear();
  TrackerLoggerCreator.mockClear();

  // Reset TrackerLogger
  TrackerLogger.mockClear();
}

// Default mocked Logger
const innerMockedLogger = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
};

export const mockedLogger: LoggerService = innerMockedLogger;

// class LoggerHelperService
export const mockedLoggerHelperSerivceMakeCreator = jest.fn(function (name: string) {
  return new TrackerLoggerCreator(mockedLogger, name);
});

export const LoggerHelperService = jest.fn().mockImplementation(() => {
  return {
    makeCreator: mockedLoggerHelperSerivceMakeCreator,
  };
});

// class TrackerLoggerCreator
export const mockedTrackerLoggerCreatorCreate = jest.fn(function (trackingId: string) {
  return new TrackerLogger(this.loggerService, this.name, trackingId);
});

export const TrackerLoggerCreator = jest.fn().mockImplementation((logger: LoggerService, name: string) => {
  return {
    name,
    loggerService: logger,
    create: mockedTrackerLoggerCreatorCreate,
  };
});

// class TrackerLogger
export const TrackerLogger = jest
  .fn()
  .mockImplementation((loggerService: LoggerService, name: string, _trackingId: string) => {
    function createMessage(message: any) {
      return {
        trackingId: _trackingId,
        message: `${name}: ${message}`,
      };
    }

    const mocked = {
      name,
      loggerService,
      _trackingId,
      createMessage,
      log: (message: any, context?: string) => loggerService.log(createMessage(message), context),
      error: (message: any, context?: string) => loggerService.error(createMessage(message), context),
      warn: (message: any, context?: string) => loggerService.warn(createMessage(message), context),
      debug: (message: any, context?: string) => loggerService.debug(createMessage(message), context),
      verbose: (message: any, context?: string) => loggerService.verbose(createMessage(message), context),
    };

    Object.defineProperty(mocked, 'trackingId', {
      get: function () {
        return this._trackingId;
      },
    });

    return mocked;
  });
