import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';
// import { AuthGuard } from './common/guards/auth.guard';
// import { ResponseInterceptor } from './common/interceptors/response.interceptor';
// import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.util';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({
    origin: config.getOrThrow<'string'>('ALLOWED_ORIGINS').split(','), // '*'
    credentials: true, // разрешить отправку куков и заголовков аутентификации
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // разрешенные методы
    exposedHeaders: ['Content-Range', 'X-Total-Count'], // какие заголовки будут доступны для клиента
    allowedHeaders: ['Content-Type', 'Authorization'], // какие заголовки может отправлять клиент
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');
  app.use(logger);
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
