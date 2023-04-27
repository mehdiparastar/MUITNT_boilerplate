import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { ChatService } from '../chat.service';

@Injectable()
export class RoomAuthGuard implements CanActivate {
  constructor(private readonly chatService: ChatService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const roomId = request.body.roomId || parseInt(request.params.roomId);
    const active = this.chatService.roomMsgAuthorization(user, roomId);
    return active;
  }
}
