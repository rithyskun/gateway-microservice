import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as basicAuth from 'express-basic-auth';
import { SwaggerDocs } from '@app/shared';

const logger = new Logger();
const port = parseInt(process.env.HTTP_PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.use(
    '/docs',
    basicAuth({
      users: { admin: 'password' },
      challenge: true,
      realm: 'API Docs',
    }),
  );
  SwaggerDocs(app);
  app.use(compression());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, async () => {
    logger.log('Http server is up and running' + (await app.getUrl()));
  });
}
bootstrap();
