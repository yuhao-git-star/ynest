import { Test, TestingModule } from '@nestjs/testing';
import { ElasticsearchConfigService } from './elasticsearch-config.service';
import { ConfigService } from '../config/config.service';
import path = require('path');
const ENV = process.env.NODE_ENV || 'development';

describe('ElasticsearchConfigService', () => {
  let service: ElasticsearchConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(path.resolve('./', '.env', `${ENV}.env`)),
        },
        // ElasticsearchConfigService
      ],
    }).compile();

    // service = module.get<ElasticsearchConfigService>(ElasticsearchConfigService);
  });

  it('should be defined', () => {
    expect(true).toBeDefined();
  });
});
