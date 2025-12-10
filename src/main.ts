import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './infra/modules/app.module';
import cors from 'cors';

dotenv.config();

async function bootstrap() {
  const server = express();
  server.use(
    cors({
      origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
      credentials: true,
    }),
  );
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(3001);
}

bootstrap();
