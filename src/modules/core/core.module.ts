import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';
import { TestModule } from './test/test.module';
import { HealthModule } from './health/health.module';
import { ProvinceModule } from './location/province/province.module';
import { AmphureModule } from './location/amphure/amphure.module';
import { DistrictModule } from './location/district/district.module';
import { PrismaModule } from '../../provider/prisma/prisma.module';

@Module({
  imports:[PrismaModule,SwaggerModule, TestModule,HealthModule, ProvinceModule,AmphureModule, DistrictModule]
})
export class CoreModule {}
