const NodeMediaServer = require('node-media-server-with-auth-middleware');
import {
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';
import { StreamTokenGuard } from 'src/authentication/guards/streamToken.guard';
import { UsersService } from 'src/users/users.service';

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    api: true,
    port: 8000, // HTTP port for HLS
    mediaroot: path.join(process.cwd(), '..', 'uploads'), // Directory where your media files are stored
    allow_origin: '*', // Allow access from any domain,
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
      },
    ],
  },
};

@Injectable()
export class MediaServerService {
  private nms: typeof NodeMediaServer;

  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {
    const createExecutionContext = (
      req: express.Request,
      res: express.Response,
    ): ExecutionContext => {
      const executionContext = {
        switchToHttp: () => ({
          getRequest: () => req,
          getResponse: () => res,
        }),
      } as ExecutionContext;
      return executionContext;
    };

    const customMiddleware: express.RequestHandler = async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      req.headers = { ...req.headers, authorization: req.query.auth as string };
      const guard = new StreamTokenGuard(this.reflector);
      const canActivate = await guard.canActivate(
        createExecutionContext(req, res),
      );
      if (
        canActivate &&
        `Bearer ${(req.user as any).streamToken}` === req.query.auth
      ) {
        // Call the next function to move to the next middleware or route handler
        next();
      } else {
        res.status(401).send('Unauthorized');
        // throw new UnauthorizedException();
      }
      // Perform some logic or actions here
    };

    this.nms = new NodeMediaServer(config, customMiddleware);

    this.nms.run();
  }
}
