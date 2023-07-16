import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { ValidationPipe } from './pipes/validation.pipe';
import * as helmet from 'helmet';
import * as fastifyRateLimit from 'fastify-rate-limit';
//import { redis } from './utils/redis';
//import * as FastifyCompress from 'fastify-compress';
import * as bodyParser from 'body-parser';
import * as xssFilter from 'x-xss-protection';
import * as hpp from 'hpp';
async function bootstrap() {
  const fastify = new FastifyAdapter({ logger: true });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
  );
  /*fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    whitelist: ['127.0.0.1'],
  });*/
  app.enableCors();
  app.use(
    helmet.default({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  //app.use(helmet.noSniff());
  //app.use(helmet.ieNoOpen());
  //app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(xssFilter());
  //app.use(hpp());
  /* app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'"],
      },
    }),
  );*/

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
