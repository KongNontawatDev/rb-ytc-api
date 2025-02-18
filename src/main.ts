import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as express from 'express';
import { JwtSubjectInterceptor } from './common/intercetors/jwt-subject-intercetor';
import { setupSwagger } from './config/swagger'; // ⬅️ Import Swagger Setup
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-version', 'x-locals'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'x-version',
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new JwtSubjectInterceptor());

  // ✅ เรียกใช้ฟังก์ชันตั้งค่า Swagger
  setupSwagger(app);

  app.use(helmet());

  app.use('/', express.static('public'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
