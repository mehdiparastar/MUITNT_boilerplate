import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { getRolesExpand, UserRoles } from '../enum/userRoles.enum';
import { Request } from 'express';

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
    if (!request.currentUser) {
      return false;
    }

    const userRoles = getRolesExpand(
      Object.keys(request.currentUser.roles).filter(
        (item) => request.currentUser.roles[item] === true,
      ),
    );

    const auth = requiredRoles.some((role) => userRoles.includes(role));

    if (auth) return auth;
    throw new UnauthorizedException();
  }
}