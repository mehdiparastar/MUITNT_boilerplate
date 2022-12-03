import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('MUITNT api')
    .setDescription('The MUITNT API description')
    .setVersion('1.0')
    .addTag('Material UI - Typescript - NestJS - TypeORM')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const appPort = process.env.PORT || 3001;
  var whitelist = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://accounts.google.com/o/oauth2/v2',
    'http://localhost:3001/auth/google-logins',
    'http://localhost:3001/auth/google/callback',
    'http://localhost:3001/auth/google/callback/last/:access/:refresh',
  ];
  app.enableCors({
    // credentials: true,
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  await app.listen(appPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
