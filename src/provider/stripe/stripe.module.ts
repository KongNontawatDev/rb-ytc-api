import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Assuming you use ConfigModule for environment variables
import { StripeService } from './stripe.service';

@Module({
  imports: [ConfigModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
