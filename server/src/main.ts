import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ApplicationSocketIOAdapter } from './socket-io-adapter';

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

  const configService = app.get(ConfigService<IconfigService>);
  const serverPort = configService.get<number>('SERVER_PORT') || 3001;
  const clientPort = configService.get('CLIENT_PORT');

  // const serverPort = process.env.PORT || 3001;
  var whitelist = [
    `http://localhost:${clientPort}`,
    `http://localhost:${serverPort}`,
    `http://localhost:8000`,
    new RegExp(`^http:\/\/192\.168\.1\.([1-9]|[1-9]\\d):${clientPort}$`),
    new RegExp(`^http:\/\/192\.168\.1\.([1-9]|[1-9]\\d):${serverPort}$`),
    new RegExp(`^http:\/\/192\.168\.0\.([1-9]|[1-9]\\d):${clientPort}$`),
    new RegExp(`^http:\/\/192\.168\.0\.([1-9]|[1-9]\\d):${serverPort}$`),
  ];
  app.enableCors({
    // credentials: true,
    origin: function (origin, callback) {
      if (
        !origin ||
        whitelist.some(
          (item) =>
            (typeof item === 'string' && item === origin) ||
            (item instanceof RegExp && item.test(origin)),
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  app.useWebSocketAdapter(new ApplicationSocketIOAdapter(app, configService));
  

  await app.listen(serverPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
