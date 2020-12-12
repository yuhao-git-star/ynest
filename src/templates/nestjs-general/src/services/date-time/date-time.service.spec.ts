import { Test, TestingModule } from '@nestjs/testing';
import { DateTimeService } from './date-time.service';

describe('DateTimeService', () => {
  let service: DateTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DateTimeService
      ],
    }).compile();

    service = module.get<DateTimeService>(DateTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
