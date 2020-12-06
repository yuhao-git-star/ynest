import { Module, DynamicModule } from '@nestjs/common';
import { RedisClientService } from './redis-client.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}
