import { Module } from '@nestjs/common';
import winston = require('winston');
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

@Module({
    imports: [
      WinstonModule.forRootAsync({
        useFactory: () => ({
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike(),
              ),
            }),
          ],
        }),
        inject: [],
      }),
    ],
    providers: [],
  })
export class APPWinstonModule {}
