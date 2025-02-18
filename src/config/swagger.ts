import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

// 📌 Function สำหรับสร้าง Swagger Document
const createSwaggerDocument = (version: string, title: string) => {
  return new DocumentBuilder()
    .setOpenAPIVersion('3.1')
    .setTitle(title)
    .setDescription(`API Documentation for version ${version}`)
    .setVersion(version)
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Local server')
    .addServer('https://nakdev.com', 'Production server')
    .build();
};

// 📌 Function สำหรับตั้งค่า Swagger
export function setupSwagger(app: INestApplication) {
  // ✅ Swagger Document สำหรับ v1
  const swaggerConfigV1 = createSwaggerDocument('1.0', 'API v1');
  const documentV1 = SwaggerModule.createDocument(app, swaggerConfigV1);
  // const documentV1 = SwaggerModule.createDocument(app, swaggerConfigV1, { include: [ModuleV1] });
  fs.writeFileSync('./swagger-spec-v1.json', JSON.stringify(documentV1, null, 2));
  SwaggerModule.setup('swagger/v1', app, documentV1);

  // ✅ Swagger Document สำหรับ v2
  const swaggerConfigV2 = createSwaggerDocument('2.0', 'API v2');
  const documentV2 = SwaggerModule.createDocument(app, swaggerConfigV2);
  // const documentV2 = SwaggerModule.createDocument(app, swaggerConfigV2, { include: [ModuleV2] });
  fs.writeFileSync('./swagger-spec-v2.json', JSON.stringify(documentV2, null, 2));
  SwaggerModule.setup('swagger/v2', app, documentV2);
}
