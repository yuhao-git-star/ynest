import { Module, Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';

const providers = [
  Logger,
]

const imports = [

]

@Module({
  imports: imports,
  providers: providers,
  exports: providers,
})
export class MockTestServiceModule { }