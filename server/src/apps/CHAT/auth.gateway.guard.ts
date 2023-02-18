// import {
//     CanActivate,
//     ExecutionContext,
//     Injectable,
//     Logger,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { WsUnauthorizedException } from 'src/exceptions/ws-exceptions';
// import { ChatService } from './chat.service';
// import { AuthPayload, SocketWithAuth } from './types';

// @Injectable()
// export class AuthGatewayGuard implements CanActivate {
//     private readonly logger = new Logger(AuthGatewayGuard.name);
//     constructor(
//         private readonly chatsService: ChatService,
//         private readonly jwtService: JwtService,
//     ) { }
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         // regular `Socket` from socket.io is probably sufficient
//         const socket: SocketWithAuth = context.switchToWs().getClient();

//         // for testing support, fallback to token header
//         const token = socket.handshake.auth.accessToken || socket.handshake.headers['accessToken'];

//         if (!token) {
//             this.logger.error('No authorization token provided');

//             throw new WsUnauthorizedException('No token provided');
//         }

//         try {
//             const payload = this.jwtService.verify<AuthPayload & { sub: string }>(
//                 token,
//             );

//             this.logger.debug(`Validating admin using token payload`, payload);

//             const { sub, pollID } = payload;

//             const poll = await this.chatsService.getPoll(pollID);

//             if (sub !== poll.adminID) {
//                 throw new WsUnauthorizedException('Admin privileges required');
//             }

//             return true;
//         } catch {
//             throw new WsUnauthorizedException('Admin privileges required');
//         }
//     }
// }
