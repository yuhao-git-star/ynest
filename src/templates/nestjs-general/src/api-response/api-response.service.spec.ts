import { Test, TestingModule } from '@nestjs/testing';
import { ApiResponseService } from './api-response.service';

describe('ApiResponseService', () => {
  let service: ApiResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiResponseService],
    }).compile();

    service = module.get<ApiResponseService>(ApiResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
