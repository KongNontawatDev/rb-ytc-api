import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';
import { TestModule } from './test/test.module';
import { HealthModule } from './health/health.module';
import { ProvinceModule } from './location/province/province.module';
import { AmphureModule } from './location/amphure/amphure.module';
import { DistrictModule } from './location/district/district.module';

@Module({
  imports:[SwaggerModule, TestModule,HealthModule, ProvinceModule,AmphureModule, DistrictModule]
})
export class CoreModule {}
