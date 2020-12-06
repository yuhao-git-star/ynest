import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AppRequest } from '../interface/user-id.interface';

export const TrackingId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AppRequest<any>>();
  return request.trackingId;
});
