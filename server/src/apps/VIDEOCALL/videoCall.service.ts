import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoCallService {
  constructor() {}

  whereRU(): string {
    return 'hello, you are in service of videoCall app.';
  }
}
