import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //eslint-disable-next-line
    const request = context.switchToHttp().getRequest();
    //eslint-disable-next-line
    return !!request.user;
  }
}
