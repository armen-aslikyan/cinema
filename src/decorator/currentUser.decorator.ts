import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../module/users/entity/user.entity';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
