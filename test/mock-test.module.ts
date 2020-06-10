import { Module, Logger } from '@nestjs/common';
import { ConfigService } from '../src/config/config.service';
import path = require('path');
import { DateTimeService } from '../src/services/date-time/date-time.service';
import { ElasticsearchConfigService } from '../src/elasticsearch-config/elasticsearch-config.service';
import { RedisClientService } from '../src/redis/redis-client/redis-client.service';
import { UserService } from '../src/services/user/user.service';
import { AuthService } from '../src/auth/auth.service';
import { MockTestServiceModule } from './mock-test-service.module';

const providers = [
  Logger,
  {
    provide: ConfigService,
    useValue: new ConfigService(path.resolve('./', '.env', `development.env`)),
  },
  DateTimeService,
  // ElasticsearchConfigService,
  RedisClientService,
  UserService,
]

@Module({
  imports: [
    MockTestServiceModule
  ],
  providers: providers,
  exports: providers,
})
export class MockTestModule { }