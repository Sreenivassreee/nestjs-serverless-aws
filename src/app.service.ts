import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const envVar = process.env.STAGE || 'Default Value';
    return `Hello World! Env: ${envVar} From Sreenivas K`;
  }
}
