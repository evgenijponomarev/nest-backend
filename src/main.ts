import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';
// import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(logger);
  // app.useGlobalGuards(new AuthGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
