import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env.PORT || 3000;
  console.warn('app running port is = ', appPort);
  await app.listen(appPort);
}
bootstrap();
