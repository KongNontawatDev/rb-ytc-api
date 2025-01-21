import { Module } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { SwaggerController } from './swagger.controller';
import { AuthModule } from '../../admin/auth/auth.module';
import { AccessControlModule } from '../../admin/access-control/access-control.module';
@Module({
  imports:[AuthModule,AccessControlModule],
  controllers: [SwaggerController],
  providers: [SwaggerService],
})
export class SwaggerModule {}
