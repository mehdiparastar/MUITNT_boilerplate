import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHello(): string {
    const nodeENV = process.env.NODE_ENV 

    return `Hello World! ENV=${nodeENV}`;
  }
}
