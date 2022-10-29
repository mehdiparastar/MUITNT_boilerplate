import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppDataSource } from '../src/data-source';

describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await AppDataSource.initialize();
    await app.init();
  });

  it('handles a signup request', async () => {
    const email = 'newtest01@test.com';
    const password = 'test';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password })
      .expect(201);
    const { id, email: email_ } = res.body;
    expect(id).toBeDefined();
    expect(email_).toEqual(email);
  });

  it('sign up as a new user then get the currently logged in user', async () => {
    const email = 'newtest0200@test.com';
    const password = 'test';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });

  afterEach(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
    await app.close();
  });
});
