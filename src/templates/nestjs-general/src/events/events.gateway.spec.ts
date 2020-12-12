import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';
import { AuthService } from '../auth/auth.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserService } from '../services/user/user.service';
import { ServiceModule } from '../services/service.module';
import * as path from 'path';
import { MockTestServiceModule } from '../../test/mock-test-service.module';

describe('EventsGateway', () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(path.resolve('./', '.env', `development.env`)),
        },
        MockTestServiceModule,
        EventsGateway,
      ],
    }).compile();

    gateway = module.get<EventsGateway>(EventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
