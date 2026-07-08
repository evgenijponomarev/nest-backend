import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';
// import { AuthGuard } from './common/guards/auth.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');
  app.use(logger);
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Nest backend API Docs')
    .setDescription('API documentation for the Nest backend course')
    .setVersion('1.0.0')
    .setContact('Evgenij Ponomarev', '', 'evgenij.ponomarev@icloud.com')
    .addBearerAuth()
    .addBasicAuth()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setTermsOfService('https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule, MovieModule],
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  });

  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: '/api-json',
    yamlDocumentUrl: '/api-yaml',
    customSiteTitle: 'Nest backend API Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
