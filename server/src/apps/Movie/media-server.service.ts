import { Injectable } from '@nestjs/common';
import * as path from 'path';
const NodeMediaServer = require('node-media-server');
// import NodeMediaServer from 'node-media-server';

@Injectable()
export class MediaServerService {
  private nms: typeof NodeMediaServer;
  // private nms: NodeMediaServer;

  constructor() {
    this.nms = new NodeMediaServer({
      auth: {
        api: true,
        api_user: 'username', // Username for API authentication
        api_pass: 'password', // Password for API authentication
        play: false, // Disable unauthenticated play access
        publish: true, // Enable authenticated publish access
        secret: 'mehdi',
      },
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
    });

    // this.nms.run();

    // this.nms.nhs.httpServer.on('prePublish', (id, streamPath) => {
    //   console.log(
    //     '[NodeEvent on prePublish]',
    //     `id=${id} streamPath=${streamPath}`,
    //   );
    // });
    // this.nms.nhs.httpServer.on('donePublish', (id, streamPath) => {
    //   console.log(
    //     '[NodeEvent on donePublish]',
    //     `id=${id} streamPath=${streamPath}`,
    //   );
    // });
    // this.nms.nhs.httpServer.on('postPublish', (id, streamPath, args) => {
    //   console.log(
    //     '[NodeEvent on postPublish]',
    //     `id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`,
    //   );
    // });
    // this.nms.nhs.httpServer.on('doneConnect', (id, args) => {
    //   console.log(
    //     '[NodeEvent on doneConnect]',
    //     `id=${id} args=${JSON.stringify(args)}`,
    //   );
    // });
    // this.nms.nhs.httpServer.on('doneClose', (id, args) => {
    //   console.log(
    //     '[NodeEvent on doneClose]',
    //     `id=${id} args=${JSON.stringify(args)}`,
    //   );
    // });

    // // this.nms.nhs.httpServer.use((req, res, next) => {
    // //   console.log('Custom middleware');
    // //   next();
    // // });

    // console.log(this.nms.nhs);
  }

  async start() {
    return await this.nms.run();
  }

  setEvents() {
    this.nms.nhs.httpServer.on('prePublish', (id, streamPath) => {
      console.log(
        '[NodeEvent on prePublish]',
        `id=${id} streamPath=${streamPath}`,
      );
    });
    this.nms.nhs.httpServer.on('donePublish', (id, streamPath) => {
      console.log(
        '[NodeEvent on donePublish]',
        `id=${id} streamPath=${streamPath}`,
      );
    });
    this.nms.nhs.httpServer.on('postPublish', (id, streamPath, args) => {
      console.log(
        '[NodeEvent on postPublish]',
        `id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`,
      );
    });
    this.nms.nhs.httpServer.on('doneConnect', (id, args) => {
      console.log(
        '[NodeEvent on doneConnect]',
        `id=${id} args=${JSON.stringify(args)}`,
      );
    });
    this.nms.nhs.httpServer.on('doneClose', (id, args) => {
      console.log(
        '[NodeEvent on doneClose]',
        `id=${id} args=${JSON.stringify(args)}`,
      );
    });
  }

  hasHttpServer() {
    return this.nms.nhs ? true : false;
  }
}
