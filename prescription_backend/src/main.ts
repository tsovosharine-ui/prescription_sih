import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Validation globale
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Prescriptions - CHU Andrainjato')
    .setDescription('Documentation interactive de l’API du module Prescription')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
}
bootstrap();
