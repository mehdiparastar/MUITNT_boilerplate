const NodeMediaServerWithAuth = require('node-media-server-with-auth-middleware');
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';
import { StreamTokenGuard } from 'src/authentication/guards/streamToken.guard';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MediaServerService {
  private nms: typeof NodeMediaServerWithAuth;
  private config: NMSConfig;

  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
    protected configService: ConfigService<IconfigService>,
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
      // req.headers = { ...req.headers, authorization: req.query.auth as string };
      // const guard = new StreamTokenGuard(this.reflector);
      // const canActivate = await guard.canActivate(
      //   createExecutionContext(req, res),
      // );
      // if (
      //   canActivate &&
      //   `Bearer ${(req.user as any).streamToken}` === req.query.auth
      // ) {
      //   // Call the next function to move to the next middleware or route handler
      //   next();
      // } else {
      //   res.status(401).send('Unauthorized');
      //   // throw new UnauthorizedException();
      // }
      // // Perform some logic or actions here
      next()
    };

    this.config = {
      rtmp: {
        port: this.configService.get<number>('NMS_RTMP_PORT'),
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30,
      },
      http: {
        port: this.configService.get<number>('NMS_HTTP_PORT'), // HTTP port for HLS
        mediaroot: path.join(process.cwd(), '..', 'uploads'), // Directory where your media files are stored
        allow_origin: '*', // Allow access from any domain,
      },
      trans: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
          {
            app: 'live',
            vc: "copy",
            vcParam: [],
            ac: "aac",
            acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
            rtmp: true,
            rtmpApp: 'live2',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
          },
        ],
      },
    };

    this.nms = new NodeMediaServerWithAuth(this.config, customMiddleware);

    this.nms.run();

    this.nms.on('preConnect', (id, args) => {
      console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
      // let session = this.nms.getSession(id);
      // session.reject();
    });

    this.nms.on('postConnect', (id, args) => {
      console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });

    this.nms.on('prePlay', (id, StreamPath, args) => {
      console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      // let session = this.nms.getSession(id);
      // session.reject();
    });






    this.nms.on('doneConnect', (id, args) => {
      console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });

    this.nms.on('prePublish', (id, StreamPath, args) => {
      console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      // let session = this.nms.getSession(id);
      // session.reject();
    });

    this.nms.on('postPublish', (id, StreamPath, args) => {
      console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    this.nms.on('donePublish', (id, StreamPath, args) => {
      console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    this.nms.on('postPlay', (id, StreamPath, args) => {
      console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    this.nms.on('donePlay', (id, StreamPath, args) => {
      console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });
  }
}
