// นำเข้าโมดูลที่จำเป็นสำหรับการทำงานของ NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as express from 'express';
import { JwtSubjectInterceptor } from './common/intercetors/jwt-subject-intercetor';

// ฟังก์ชันหลักสำหรับการเริ่มต้นแอปพลิเคชัน
async function bootstrap() {
  // สร้าง NestJS application instance
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-version','x-locals'],
    credentials: true,
  });

  // กำหนด prefix 'api' สำหรับทุก route
  app.setGlobalPrefix('api');

  // เปิดใช้งานการทำ versioning สำหรับ API โดยใช้รูปแบบ URI
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'x-version',
    defaultVersion: '1',
  });

  // ตั้งค่า global pipes สำหรับการตรวจสอบข้อมูล
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new JwtSubjectInterceptor());

  // ตั้งค่า Swagger สำหรับการทำเอกสาร API
  const config = new DocumentBuilder()
    .setOpenAPIVersion('3.1')
    .setTitle('API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-version', in: 'header' }, 'x-version')
    .addServer('http://localhost:3000', 'Local server')
    .addServer('https://nakdev.com', 'Production server')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      tryItOutEnabled: true,
      showCurl: false,
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
    },
  });

  app.use('/', express.static('public'));

  // เริ่มต้น server ที่พอร์ตที่กำหนด หรือ 3000 เป็นค่าเริ่มต้น
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
