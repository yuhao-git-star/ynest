import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmConfigService } from './type-orm-config.service';
import { ConfigService } from '../config/config.service';
import * as path from 'path';

const ENV = process.env.NODE_ENV || 'development';

describe('TypeOrmConfigService', () => {
  let service: TypeOrmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ConfigService,
        useValue: new ConfigService(path.resolve('./', '.env', `${ENV}.env`)),
      },
      TypeOrmConfigService,
    ],
    }).compile();

    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
