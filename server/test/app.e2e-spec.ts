import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppDataSource } from '../src/data-source';
import { AppModule } from './../src/app.module';

const nodeENV = process.env.NODE_ENV 

describe('AppController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(600000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await AppDataSource.initialize();
  });
  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(`Hello World! ENV=${nodeENV}`);
  });
});
