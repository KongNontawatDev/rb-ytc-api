import { Module } from '@nestjs/common';
import { PrismaModule } from './provider/prisma/prisma.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerService } from './common/logger/logger.service';
import { AdminModule } from './modules/admin/admin.module';
import { CoreModule } from './modules/core/core.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from './common/intercetors/http.intercetor';
import { MailerModule } from './provider/mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { AppModule as AppClientModule } from './modules/app/app.module';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    PrismaModule,
    AdminModule,
    AppClientModule,
    CoreModule,
    MailerModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
})
export class AppModule {}
