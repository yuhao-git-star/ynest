import { Module } from '@nestjs/common';
import winston = require('winston');
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { ConfigService } from '../config/config.service';
import { LoggerHelperService } from './logger-helper.service';

const prettyJson = winston.format.printf((info) => {
  if (info?.message?.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }
  return `${info.level}: ${info.message}`;
});

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (configServices: ConfigService) => ({
        level: configServices.logLevel,
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.prettyPrint(),
              winston.format.splat(),
              winston.format.simple(),
              prettyJson,
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LoggerHelperService],
  exports: [LoggerHelperService],
})
export class APPWinstonModule {}
