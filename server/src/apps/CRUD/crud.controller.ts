import { Controller, Get } from '@nestjs/common';

@Controller('crud')
export class CrudController {
  constructor() {}

  @Get()
  whereRU(): string {
    return 'hello, you are in crud app.';
  }
}
