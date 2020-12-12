import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { MockTestModule } from '../../../test/mock-test.module';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockTestModule,
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
