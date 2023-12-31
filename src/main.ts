import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.useStaticAssets(join(__dirname, '..', 'public-flutter'));
  // app.setBaseViewsDir(join(__dirname, '..', 'index'));
  // app.setViewEngine('html');
  app.use(cookieParser())
  app.enableCors({
    credentials :true
  })
  await app.listen(3000);
}
bootstrap();
