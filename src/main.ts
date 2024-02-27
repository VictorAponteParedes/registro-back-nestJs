import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('app');
  app.enableCors();
  const logger = new Logger();

  await app.listen(3000);
  logger.log(`Server on port: ${await app.getUrl()}`);
}
bootstrap();
