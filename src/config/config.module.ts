import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as path from 'path';

const ENV = process.env.NODE_ENV || 'development';
@Global()
@Module({
    providers: [
      {
        provide: ConfigService,
        useValue: new ConfigService(path.resolve('./', '.env', `${ENV}.env`)),
      },
    ],
    exports: [ConfigService],
  })
export class ConfigModule {}
