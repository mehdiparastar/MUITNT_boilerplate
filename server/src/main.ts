import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('MUITNT api')
    .setDescription('The MUITNT API description')
    .setVersion('1.0')
    .addTag('Material UI - Typescript - NestJS - TypeORM')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const appPort = process.env.PORT || 3001;
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  await app.listen(appPort);
}
bootstrap();
