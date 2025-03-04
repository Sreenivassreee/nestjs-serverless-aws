import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running locally at http://localhost:${PORT}`);
  });
}


bootstrap();