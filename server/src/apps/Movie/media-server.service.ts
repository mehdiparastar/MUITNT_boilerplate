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
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30,
      },
      http: {
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

    this.nms.run();
    this.nms.on('prePublish', (id, streamPath) => {
      console.log(
        '[NodeEvent on prePublish]',
        `id=${id} streamPath=${streamPath}`,
      );
    });
    this.nms.on('donePublish', (id, streamPath) => {
      console.log(
        '[NodeEvent on donePublish]',
        `id=${id} streamPath=${streamPath}`,
      );
    });
    this.nms.on('postPublish', (id, streamPath, args) => {
      console.log(
        '[NodeEvent on postPublish]',
        `id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`,
      );
    });
    this.nms.on('doneConnect', (id, args) => {
      console.log(
        '[NodeEvent on doneConnect]',
        `id=${id} args=${JSON.stringify(args)}`,
      );
    });
    this.nms.on('doneClose', (id, args) => {
      console.log(
        '[NodeEvent on doneClose]',
        `id=${id} args=${JSON.stringify(args)}`,
      );
    });
  }

  // async start() {
  //   await this.nms.run();
  // }

  // async stop() {
  //   await this.nms.stop();
  // }

  getStreamKeyFromStreamPath(path:string) {
    let parts = path.split('/');
    return parts[parts.length - 1];
  }

  async createStream(
    videoId: number,
  ): Promise<{ streamKey: string; streamUrl: string }> {
    try {
      const streamKey = `${videoId}`;
      const streamUrl = `http://localhost:8000/live/${streamKey}/index.m3u8`;

      const x = this.nms.getSession(streamUrl);
      // const y = await x.publish();

      return { streamKey, streamUrl };
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }
}
