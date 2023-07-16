import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';

const nodeENV = process.env.NODE_ENV 

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it(`should return Hello World! ENV=${nodeENV}`, () => {
      expect(appController.getHello()).toBe(`Hello World! ENV=${nodeENV}`);
    });
  });
});
