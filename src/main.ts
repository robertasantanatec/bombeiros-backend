import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import cors from 'cors';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './infra/modules/app.module';

dotenv.config();

async function bootstrap() {
  const server = express();

  server.use(
    cors({
      origin: '*',
      methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      allowedHeaders: '*',
    }),
  );

  server.options('*', cors()); 

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: false,
  });

  await app.listen(3001);
}

bootstrap();
