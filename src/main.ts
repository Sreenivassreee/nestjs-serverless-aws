import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as awsServerlessExpress from 'aws-serverless-express';
import { Handler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  return awsServerlessExpress.createServer(server);
}

let cachedServer: any;

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  
  return new Promise((resolve, reject) => {
    awsServerlessExpress.proxy(cachedServer, event, context, "CALLBACK", (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
