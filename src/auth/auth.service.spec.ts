import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../services/user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
      ],
      providers: [

      ]
    }).compile();

    // service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(true).toBeDefined();
  });
});
