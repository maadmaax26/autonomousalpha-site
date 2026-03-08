import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      
      console.log(`✅ New subscription: ${session.customer_email}`);
      console.log(`   Subscription ID: ${subscription.id}`);
      console.log(`   Trial ends: ${new Date(subscription.trial_end! * 1000)}`);
      
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`💰 Payment: $${invoice.amount_paid / 100}`);
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      console.error(`❌ Payment failed: ${failedInvoice.customer_email}`);
      break;

    case 'customer.subscription.deleted':
      const deleted = event.data.object as Stripe.Subscription;
      console.log(`👋 Cancelled: ${deleted.id}`);
      break;
  }

  return NextResponse.json({ received: true });
}
