import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppDataSource } from '../src/data-source';

describe('Authentication system', () => {
  let app: INestApplication;

  const email01 = 'newtest01@test.com';
  const password01 = 'test01';
  const email02 = 'newtest02@test.com';
  const password02 = 'test02';

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

  it('handles a signup request', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: email01, password: password01 })
      .expect(201);
    const { id, email: email_ } = res.body;
    expect(id).toBeDefined();
    expect(email_).toEqual(email01);
  });

  it('Throwing 400 error on a duplicate user signing up.', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: email01, password: password01 })
      .expect(400);
  });

  it('sign up as a new user then get the currently logged in user then sign out.', async () => {
    const signup = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: email02, password: password02 })
      .expect(201);

    const cookie = signup.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email02);

    const signout = await request(app.getHttpServer())
      .post('/auth/signout')
      .set('Cookie', cookie)
      .expect(201);
  });

  it('throw unauthorized err on approve role', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: email02, password: password02 })
      .expect(201);

    const cookie = login.get('Set-Cookie');

    const approveRole = await request(app.getHttpServer())
      .patch('/auth/change-user-roles/2')
      .set('Cookie', cookie)
      .send({ admin: true })
      .expect(401);
  });

  it('change user email', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: email01, password: password01 })
      .expect(201);

    const cookie = login.get('Set-Cookie');

    const changeEmail = await request(app.getHttpServer())
      .patch('/auth/change-email')
      .set('Cookie', cookie)
      .send({ email: 'aaa@aaa.com' })
      .expect(200);

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual('aaa@aaa.com');
  });

  it('change user password', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: email02, password: password02 })
      .expect(201);

    const cookie = login.get('Set-Cookie');

    const changePassword = await request(app.getHttpServer())
      .patch('/auth/change-password')
      .set('Cookie', cookie)
      .send({ password: 'aaa' })
      .expect(200);

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);
  });
});
