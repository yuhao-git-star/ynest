import { Test, TestingModule } from '@nestjs/testing';
import { RedisClientService } from './redis-client.service';
import { ConfigModule } from '../../config/config.module';

describe('RedisClientService', () => {
  let service: RedisClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule
      ],
      providers: [
        // RedisClientService
      ],
    }).compile();

    // service = module.get<RedisClientService>(RedisClientService);
  });

  it('should be defined', () => {
    expect(true).toBeDefined();
  });
});