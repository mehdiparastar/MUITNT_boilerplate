import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ENV=${process.env.NODE_ENV}`;
  }
}
