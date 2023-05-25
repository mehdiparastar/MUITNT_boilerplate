import { Injectable } from '@nestjs/common';
import * as NodeMediaServer from 'node-media-server';

@Injectable()
export class MediaServerService {
  private readonly nms: NodeMediaServer;

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
        port: 8000,
        allow_origin: '*',
      },
      app: 'live',
      // auth: {
      //   play: true,
      //   publish: true,
      //   secret: 'secret_key',
      // },
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

  async start() {
    await this.nms.run();
  }

  async stop() {
    await this.nms.stop();
  }

  async createStream(
    videoHash: string,
  ): Promise<{ streamKey: string; streamUrl: string }> {
    try {
      const streamKey = `video_${videoHash}}`;
      const streamUrl = `http://localhost:8000/live/${streamKey}/index.m3u8`;

      const x = await this.nms.getSession('live', streamKey);
      const y = await x.publish();

      return { streamKey, streamUrl };
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }
}
