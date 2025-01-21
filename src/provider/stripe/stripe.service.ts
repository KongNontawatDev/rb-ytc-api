import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  async createCheckoutSession(params: Stripe.Checkout.SessionCreateParams): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.create(params);
  }

  async updateCheckoutSession(sessionId: string, params: Stripe.Checkout.SessionUpdateParams): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.update(sessionId, params);
  }

  async retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }

  // async createRefund(params: Stripe.RefundCreateParams): Promise<Stripe.Refund> {
  //   return this.stripe.refunds.create(params);
  // }

  // async createUser(params: Stripe.UserCreateParams): Promise<Stripe.User> {
  //   return this.stripe.users.create(params);
  // }

  async createPayment(amount: number, currency: string) {
    try {
      if (!amount || !currency) {
        throw new Error('Missing required fields');
      }

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['promptpay'],
        payment_method_data: {
          type: 'promptpay',
          billing_details: {
            email: 'kongzaa15885@gmail.com',
            name: 'kong',
            phone: '0644870915',
            address: {
              city: 'yasothon',
              country: 'TH',
              line1: '123 Test Street',
              postal_code: '35000',
              state: 'Yasothon',
            },
          },
        },
        confirm: true,
      });

      const qrCode = paymentIntent.next_action?.promptpay_display_qr_code;

      if (!qrCode) {
        throw new Error('Could not generate QR code');
      }

      return {
        success: true,
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        qrCodeImage: qrCode.image_url_png,
        qrCodeData: qrCode.data,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
        expiryTime: paymentIntent.created + 30 * 60,
      };
    } catch (error) {
      console.log('Error creating payment:', error.message);
      throw error;
    }
  }

  async checkPaymentStatus(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        success: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method,
        created: paymentIntent.created,
        nextAction: paymentIntent.next_action,
      };
    } catch (error) {
      console.log('Error checking payment status:', error.message);
      throw error;
    }
  }

  handleWebhook(body: Buffer, sig: string, webhookSecret: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(body, sig, webhookSecret);

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
      }

      return { received: true };
    } catch (err) {
      console.log('Webhook error:', err.message);
      throw err;
    }
  }
}
