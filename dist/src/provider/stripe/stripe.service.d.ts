import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createCheckoutSession(params: Stripe.Checkout.SessionCreateParams): Promise<Stripe.Checkout.Session>;
    updateCheckoutSession(sessionId: string, params: Stripe.Checkout.SessionUpdateParams): Promise<Stripe.Checkout.Session>;
    retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session>;
    createPayment(amount: number, currency: string): Promise<{
        success: boolean;
        id: string;
        clientSecret: string | null;
        qrCodeImage: string;
        qrCodeData: string;
        amount: number;
        status: Stripe.PaymentIntent.Status;
        expiryTime: number;
    }>;
    checkPaymentStatus(paymentIntentId: string): Promise<{
        success: boolean;
        status: Stripe.PaymentIntent.Status;
        amount: number;
        currency: string;
        paymentMethod: string | Stripe.PaymentMethod | null;
        created: number;
        nextAction: Stripe.PaymentIntent.NextAction | null;
    }>;
    handleWebhook(body: Buffer, sig: string, webhookSecret: string): {
        received: boolean;
    };
}
