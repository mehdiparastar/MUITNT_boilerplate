const NodeMediaServerWithAuth = require('node-media-server-with-auth-middleware');
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { StreamTokenGuard } from 'src/authentication/guards/streamToken.guard';
import { UsersService } from 'src/users/users.service';
import { Writable } from 'stream';
import { spawn } from 'child_process';
// import flvjs from 'flv.js';
// const { Mp4Frag, createWriteStream } = require('mp4frag');
import * as Mp4Frag from 'mp4frag'
import { Decoder } from 'ebml'
import ffmpeg from 'fluent-ffmpeg'

@Injectable()
export class MediaServerService {
  private nms: typeof NodeMediaServerWithAuth;
  private config: any//NMSConfig;
  private uploadPath: string;

  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
    protected configService: ConfigService<IconfigService>,
  ) {
    this.uploadPath = path.join(process.cwd(), '..', 'uploads', 'conference'); // Define your upload directory

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
      if (true) {
        next()
      }
      else
        if (
          req.url.slice(0, 8) === '/static/' ||
          req.url.slice(0, 8) === '/favicon' ||
          req.url.slice(0, 8) === '/api/ser' ||
          req.url.slice(0, 8) === '/api/str'
        ) {
          next()
        }
        else {
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
            console.log('\n\n\n\n', req.query.auth, req.url.slice(0, 8), '\n\n\n\n\n\n')
            res.status(401).send('Unauthorized');
            // throw new UnauthorizedException();
          }
        }
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
            // vc: "copy",
            // vcParam: [],
            // ac: "aac",
            // acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
            // rtmp: true,
            // rtmpApp: 'live2',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            // hlsKeep: true, // to prevent hls file delete after end the stream
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
            // mp4: true,
            // mp4Flags: '[movflags=frag_keyframe+empty_moov]',
            // dashKeep: true // to prevent dash file delete after end the stream
          },
        ],
      },
    };

    // this.config = {
    //   server: {
    //     secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
    //     port: 3333
    //   },
    //   rtmp_server: {
    //     rtmp: {
    //       port: this.configService.get<number>('NMS_RTMP_PORT'),
    //       chunk_size: 60000,
    //       gop_cache: true,
    //       ping: 60,
    //       ping_timeout: 30
    //     },
    //     http: {
    //       port: this.configService.get<number>('NMS_HTTP_PORT'), // HTTP port for HLS,
    //       mediaroot: path.join(process.cwd(), '..', 'uploads'), // Directory where your media files are stored,
    //       allow_origin: '*'
    //     },
    //     trans: {
    //       ffmpeg: '/usr/bin/ffmpeg',
    //       tasks: [
    //         {
    //           app: 'live',
    //           hls: true,
    //           hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
    //           dash: true,
    //           dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
    //         }
    //       ]
    //     }
    //   }
    // };

    this.nms = new NodeMediaServerWithAuth(this.config, customMiddleware);

    this.nms.run();

    // this.nms.on('preConnect', (id, args) => {
    //   console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
    //   // let session = this.nms.getSession(id);
    //   // session.reject();
    // });

    // this.nms.on('postConnect', (id, args) => {
    //   console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
    // });

    // this.nms.on('prePlay', (id, StreamPath, args) => {
    //   console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    //   let session = this.nms.getSession(id);
    //   const socket = session.req.socket
    //   // let flvPlayer = null

    //   const streamPath = '/live/stream_key'; // Replace with the desired stream path














    //   // const writableStream = fs.createWriteStream(path.join(this.uploadPath, 'mehdi'));
    //   // const mp4frag = new Mp4Frag();



    //   // // Pipe the received video stream chunks to the mp4frag instance
    //   // socket.pipe(mp4frag);

    //   // // Pipe the fMP4 fragments to the writable stream to save them to a file
    //   // mp4frag.pipe(writableStream);





    //   // const ffmpegProcess = spawn('ffmpeg', [
    //   //   '-f', 'flv',
    //   //   '-i', 'pipe:0',
    //   //   '-c:v', 'copy',
    //   //   '-c:a', 'copy',
    //   //   '-f', 'mp4',
    //   //   '-movflags', 'frag_keyframe+empty_moov',
    //   //   '-frag_duration', '5000000',
    //   //   path.join(this.uploadPath, 'mehdi'),
    //   // ]);

    //   // socket.pipe(ffmpegProcess.stdin);
    //   // ffmpegProcess.stdout.pipe(writableStream);




    //   // const writableStream = fs.createWriteStream(path.join(this.uploadPath, 'mehdi.webm'));
    //   // socket.pipe(writableStream);





    //   // // Create a writable stream to capture the video stream chunks
    //   // const writableStream = new Writable({
    //   //   write(chunk, encoding, callback) {
    //   //     // Here you can process the received chunk or directly forward it to RTMP
    //   //     // For simplicity, let's just log the received chunk
    //   //     console.log('Received chunk:');

    //   //     callback();
    //   //   },
    //   // });

    //   // // Pipe the received video stream chunks to the writable stream
    //   // socket.on('data', (chunk) => {
    //   //   writableStream.write(chunk);
    //   // });


    //   const recordedChunks = []; // Store received video chunks
    //   const filePath = path.join(this.uploadPath, 'mehdi.webm')
    //   const no = []

    //   socket.on('data', async (chunk) => {
    //     recordedChunks.push(chunk);
    //     // Concatenate all chunks and save the resulting file
    //     // const concatenatedBuffer = Buffer.concat(recordedChunks);
    //     no.push('data')
    //     console.log(no.length, recordedChunks.length)
    //     // fs.writeFile(filePath, concatenatedBuffer, (err) => {
    //     //   if (err) {
    //     //     console.error('Error saving concatenated file:', err);
    //     //     // socket.emit('recordingError', err.message);
    //     //   } else {
    //     //     console.log('Recording saved:', filePath);
    //     //     // socket.emit('recordingSaved', filePath);
    //     //   }
    //     // });

    //     // console.log('data')
    //     // Convert Blob data to ArrayBuffer
    //     // const arrayBuffer = await chunk.arrayBuffer();
    //     // writableStream.write(chunk);
    //     // Send the video stream to the NMS RTMP server using flv.js
    //     // if (!flvPlayer) {
    //     //   flvPlayer = flvjs.createPlayer({
    //     //     type: 'flv',
    //     //     url: `rtmp://192.168.1.6:1955/live/mehdi`,
    //     //   });
    //     //   // flvPlayer.attachMediaElement(localVideoRef);
    //     //   flvPlayer.load();
    //     //   flvPlayer.play();
    //     // }
    //     // flvPlayer.write(arrayBuffer);

    //     // -re -i crowdrun.mp4 -c:v libx264 -c:a aac -f flv rtmp://localhost/show/stream

    //     // spawn('ffmpeg', [
    //     //   '-re',
    //     //   '-i', `${chunk}`,  //Buffer 00 00 00 1c 66 74 79 70 64 61..........
    //     //   '-c:v', 'libx264',
    //     //   '-c:a', 'aac',
    //     //   '-f', 'flv',          
    //     //   'Rtmp_Uri', 'rtmp://192.168.1.6:1955/live/stream'
    //     // ]);

    //     fs.appendFileSync(path.join(this.uploadPath, 'mehdi.webm'), chunk)

    //     // const decoder = new Decoder();
    //     // decoder.write(chunk)
    //     // decoder.on('data', chunk => {
    //     //   fs.appendFileSync(path.join(this.uploadPath, 'mehdi.webm'), (chunk[1] as any).data as any)
    //     // });
    //   })



    //   console.log(Object.keys(session), session.playStreamPath)
    //   // session.reject();
    // });


    // this.nms.on('doneConnect', (id, args) => {
    //   console.log('[NodeEvent on doneConnect]', `id = ${id} args = ${JSON.stringify(args)}`);
    // });

    // this.nms.on('prePublish', (id, StreamPath, args) => {
    //   console.log('[NodeEvent on prePublish]', `id = ${id} StreamPath = ${StreamPath} args = ${JSON.stringify(args)}`);
    //   // let session = this.nms.getSession(id);
    //   // session.reject();
    // });

    // this.nms.on('postPublish', (id, StreamPath, args) => {
    //   console.log('[NodeEvent on postPublish]', `id = ${id} StreamPath = ${StreamPath} args = ${JSON.stringify(args)}`);
    // });

    // this.nms.on('donePublish', (id, StreamPath, args) => {
    //   console.log('[NodeEvent on donePublish]', `id = ${id} StreamPath = ${StreamPath} args = ${JSON.stringify(args)}`);
    // });

    // this.nms.on('postPlay', (id, StreamPath, args) => {
    //   console.log('[NodeEvent on postPlay]', `id = ${id} StreamPath = ${StreamPath} args = ${JSON.stringify(args)}`);
    // });

    // this.nms.on('donePlay', (id, StreamPath, args) => {
    //   console.log('[NodeEvent on donePlay]', `id = ${id} StreamPath = ${StreamPath} args = ${JSON.stringify(args)}`);
    // });

  }
}
