import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export function InjectWinstonLoggerService() {
  return Inject(WINSTON_MODULE_NEST_PROVIDER);
}
