import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UserRoles } from '../enum/userRoles.enum';
import { getRolesExpand } from '../helperFunctions/get-roles-expand';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // @Session() private session: any
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }

    const userRoles = getRolesExpand(request.user.roles);

    const auth = requiredRoles.some((role) => userRoles.includes(role));

    if (auth) return auth;
    throw new UnauthorizedException();
  }
}
