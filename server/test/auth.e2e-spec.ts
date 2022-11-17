import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppDataSource } from '../src/data-source';
import { CreateLocalUserDto } from '../src/users/dto/user/create-local-user.dto';
import { AppModule } from './../src/app.module';

let fakeUsersDto: CreateLocalUserDto[] = [
  {
    email: 'toEnterTestUser01@test.com',
    password: 'test01',
  },
  {
    email: 'toEnterTestUser02@test.com',
    password: 'test02',
  },
  {
    email: 'toEnterTestUser03@test.com',
    password: 'test03',
  },
];

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

  it('handles a create new user with credentials', async () => {
    const res1 = await request(app.getHttpServer())
      .post('/auth/create')
      .send(fakeUsersDto[0])
      .expect(201);
    const { accessToken, refreshToken } = res1.body;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();

    // duplicate user creating ...
    const res2 = await request(app.getHttpServer())
      .post('/auth/create')
      .send(fakeUsersDto[0])
      .expect(400);
  });

  it('should get a JWT then successfully make a call and finally successfully logging out.', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);

    const { accessToken, refreshToken } = loginReq.body;
    const profileReq = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(profileReq.body).toHaveProperty('id', 1);

    const logoutReq = await request(app.getHttpServer())
      .get('/auth/logout')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(logoutReq.body).toHaveProperty('id', 1);
  });

  it('check refrsh token functionality', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    const { accessToken, refreshToken } = loginReq.body;

    const refreshTokenReq = await request(app.getHttpServer())
      .get('/auth/refresh')
      .set('Authorization', 'Bearer ' + refreshToken)
      .expect(200);
    const {
      accessToken: refreshed_accessToken,
      refreshToken: refreshed_refreshToken,
    } = refreshTokenReq.body;
    expect(refreshed_accessToken).toBeDefined();
    expect(refreshed_refreshToken).toBeDefined();

    const profileReq = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + refreshed_accessToken)
      .expect(200);
    expect(profileReq.body).toHaveProperty('id', 1);

    const logoutReq = await request(app.getHttpServer())
      .get('/auth/logout')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(logoutReq.body).toHaveProperty('id', 1);
  });

  it('throw unauthorized err on approve role', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    const { accessToken, refreshToken } = loginReq.body;

    await request(app.getHttpServer())
      .patch('/auth/change-user-roles/2')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({ admin: true })
      .expect(401);
  });

  it('check approving role functionality', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    const { accessToken, refreshToken } = loginReq.body;

    await request(app.getHttpServer())
      .patch(`/auth/approve-role-as-superuser/${fakeUsersDto[0].email}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    await request(app.getHttpServer())
      .patch('/auth/change-user-roles/1')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({ adminSection1: true })
      .expect(200);

    const profileReq = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(profileReq.body.roles).toContain('adminSection1');
  });

  it('change user email', async () => {
    let loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    let { accessToken, refreshToken } = loginReq.body;

    const changeEmailReq = await request(app.getHttpServer())
      .patch('/auth/change-email')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({ email: 'aaa@aaa.com' })
      .expect(200);

    fakeUsersDto[0].email = changeEmailReq.body.email;

    const logoutReq = await request(app.getHttpServer())
      .get('/auth/logout')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(logoutReq.body).toHaveProperty('id', 1);

    loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    accessToken = loginReq.body.accessToken;
    refreshToken = loginReq.body.refreshToken;

    const profileReq = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(profileReq.body).toHaveProperty('email', 'aaa@aaa.com');
  });

  it('change user password', async () => {
    let loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    let { accessToken, refreshToken } = loginReq.body;

    const changePasswordReq = await request(app.getHttpServer())
      .patch('/auth/change-password')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({ password: 'aaa' })
      .expect(200);

    fakeUsersDto[0].password = 'aaa';

    const logoutReq = await request(app.getHttpServer())
      .get('/auth/logout')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(logoutReq.body).toHaveProperty('id', 1);

    loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    accessToken = loginReq.body.accessToken;
    refreshToken = loginReq.body.refreshToken;

    const profileReq = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(profileReq.body).toHaveProperty('id', 1);
  });

  it('gets all user', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    const { accessToken, refreshToken } = loginReq.body;

    await request(app.getHttpServer())
      .patch(`/auth/approve-role-as-superuser/${fakeUsersDto[0].email}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    await request(app.getHttpServer())
      .get('/auth/all')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
  });

  it('gets FIND BY EMAIL', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    const { accessToken, refreshToken } = loginReq.body;

    await request(app.getHttpServer())
      .patch(`/auth/approve-role-as-superuser/${fakeUsersDto[0].email}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    const getUserByEmailReq = await request(app.getHttpServer())
      .get(`/auth/find-by-email?email=${fakeUsersDto[0].email}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    expect(getUserByEmailReq.body[0].id).toEqual(1);
  });

  it('gets FIND one BY id', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    const { accessToken, refreshToken } = loginReq.body;

    await request(app.getHttpServer())
      .patch(`/auth/approve-role-as-superuser/${fakeUsersDto[0].email}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    const getUserByEmailReq = await request(app.getHttpServer())
      .get(`/auth/find-by-id?id=1`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    expect(getUserByEmailReq.body.email).toEqual(fakeUsersDto[0].email);
  });

  it('check removing user', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send(fakeUsersDto[0])
      .expect(201);
    const { accessToken, refreshToken } = loginReq.body;

    await request(app.getHttpServer())
      .patch(`/auth/approve-role-as-superuser/${fakeUsersDto[0].email}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    const deleteUserReq = await request(app.getHttpServer())
      .delete(`/auth/delete-user/1`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);

    expect(deleteUserReq.body.email).toEqual(fakeUsersDto[0].email);
  });

  it('check login using google', async () => {
    const loginReq = await request(app.getHttpServer()).get(
      '/auth/google-logins',
    );
    expect(loginReq.header.location).toContain('https://accounts.google.com/o/oauth2/v2/auth')    
  });
});
