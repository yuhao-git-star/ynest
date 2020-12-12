import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MockTestServiceModule } from '../../../test/mock-test-service.module';
import { ConfigService } from '../../config/config.service';
import path = require('path');

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockTestServiceModule
      ],
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(path.resolve('./', '.env', `development.env`)),
        },
        UserService
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
