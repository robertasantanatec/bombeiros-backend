import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './infra/modules/app.module';

dotenv.config();

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
