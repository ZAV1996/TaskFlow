import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { ZodValidationPipe } from 'nestjs-zod';
import { RedisService } from './redis/redis.service';
const PORT = process.env.SERVER_PORT || 5000;
const ORIGIN = process.env.ORIGIN;
async function start() {
  const app = await NestFactory.create(AppModule);
  const redisService = app.get(RedisService);
  if (!(await redisService.checkConnection())) {
    throw new Error('Redis connection failed');
  }
  app.use(cookieParser());
  app.useGlobalPipes(new ZodValidationPipe())
  app.use(graphqlUploadExpress({
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    maxFiles: 5,
  }));
  app.enableCors({
    origin: ORIGIN,
    credentials: true
  })
  await app.listen(PORT, () => { console.log(`Server started on PORT=${PORT}`) });
}
start()
