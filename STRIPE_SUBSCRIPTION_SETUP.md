# Stripe Subscription Setup - AutonomousAlpha

## Phase 1: SaaS Launch (Today)

### Overview
Launch RAmmStein Pro as a **subscription service** - $99/month recurring.

---

## Step 1: Create Stripe Account (5 min)

```bash
Open: https://dashboard.stripe.com/register

Business Details:
- Business name: AutonomousAlpha
- Industry: Software/Digital Products
- Website: autonomousalpha.io (or placeholder)
- Business email: hello@autonomousalpha.io
```

---

## Step 2: Create Subscription Products (5 min)

### Dashboard → Products → Add Product

**Product 1: RAmmStein Pro** ⭐
```yaml
Name: RAmmStein Pro
Description: AI-powered trading bot for Hyperliquid perpetuals
Product ID: prod_rammstein_pro
Price: $99.00 / month
Pricing Model: Standard pricing
Billing Type: Recurring
Billing Interval: Monthly
```

**Product 2: MES Master**
```yaml
Name: MES Master
Description: Options income bot for MES futures
Product ID: prod_mes_master
Price: $149.00 / month
Pricing Model: Standard pricing
Billing Type: Recurring
Billing Interval: Monthly
```

**Product 3: Complete Bundle**
```yaml
Name: AutonomousAlpha Complete
Description: Both bots + framework access
Product ID: prod_complete_bundle
Price: $199.00 / month
Pricing Model: Standard pricing
Billing Type: Recurring
Billing Interval: Monthly
```

### Copy Price IDs
After creating, copy these:
- `price_xxx` (RAmmStein Pro)
- `price_yyy` (MES Master)
- `price_zzz` (Complete Bundle)

---

## Step 3: Get API Keys (2 min)

```
Dashboard → Developers → API Keys

Test Mode (for development):
├─ Publishable key: pk_test_xxxxx
└─ Secret key: sk_test_xxxxx

Live Mode (for production):
├─ Publishable key: pk_live_xxxxx
└─ Secret key: sk_live_xxxxx
```

**Save these - you'll need them in Step 4**

---

## Step 4: Configure Webhook (5 min)

### For Local Development

```bash
# Install Stripe CLI
curl -s https://packages.stripe.dev/api/security/stripe-cli/gpgpgp_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/api/stripe-cli/debian stable main" | sudo tee /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe

# Login
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhook

# Copy webhook signing secret
# Will output: whsec_xxxxx
```

### For Production (Vercel)

```
Dashboard → Developers → Webhooks → Add endpoint

Endpoint URL: https://autonomousalpha.io/api/webhook
Events to listen to:
✅ customer.subscription.created
✅ customer.subscription.updated
✅ customer.subscription.deleted
✅ invoice.payment_succeeded
✅ invoice.payment_failed
✅ checkout.session.completed
```

---

## Step 5: Environment Variables

Create `/home/efinney/.openclaw/workspace/business/autonomous-alpha/web/.env.local`:

```bash
# Stripe Keys - TEST MODE (use live for production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # From stripe listen command

# Product Price IDs
NEXT_PUBLIC_PRICE_RAMMSTEIN=price_xxxxx
NEXT_PUBLIC_PRICE_MES=price_yyyy
NEXT_PUBLIC_PRICE_COMPLETE=price_zzzz

# Domain
NEXT_PUBLIC_DOMAIN=http://localhost:3000
# Production: https://autonomousalpha.io
```

---

## Step 6: Install Dependencies

```bash
cd /home/efinney/.openclaw/workspace/business/autonomous-alpha/web

npm install stripe @stripe/stripe-js
npm install @stripe/react-stripe-js
```

---

## Step 7: Create Subscription Checkout API

**File:** `app/api/checkout/route.ts`

```typescript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const { priceId, customerEmail, customerName } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata: {
        product: 'RAmmStein Pro',
        customer_name: customerName,
      },
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
      subscription_data: {
        trial_period_days: 7, // 7-day free trial
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

---

## Step 8: Webhook Handler

**File:** `app/api/webhook/route.ts`

```typescript
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
      
      // Get subscription details
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      
      console.log(`✅ New subscription: ${session.customer_email}`);
      console.log(`   Subscription ID: ${subscription.id}`);
      console.log(`   Status: ${subscription.status}`);
      console.log(`   Trial ends: ${new Date(subscription.trial_end! * 1000)}`);
      
      // TODO: Store in database
      // await db.subscriptions.create({...})
      
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`💰 Payment received: ${invoice.amount_paid / 100} USD`);
      // TODO: Update subscription status
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      console.error(`❌ Payment failed for ${failedInvoice.customer_email}`);
      // TODO: Notify customer, update status
      break;

    case 'customer.subscription.deleted':
      const deletedSub = event.data.object as Stripe.Subscription;
      console.log(`👋 Subscription cancelled: ${deletedSub.id}`);
      // TODO: Disable access
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

---

## Step 9: Subscription Button Component

**File:** `components/SubscribeButton.tsx`

```typescript
'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SubscribeButtonProps {
  priceId: string;
  productName: string;
  price: number;
  features: string[];
}

export default function SubscribeButton({ priceId, productName, price, features }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId,
          customerEmail: '', // Stripe will collect this
          customerName: '',
        }),
      });

      const { sessionId, error } = await response.json();
      
      if (error) throw new Error(error);

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
      <h3 className="text-2xl font-bold text-white mb-2">{productName}</h3>
      <div className="text-4xl font-bold text-green-500 mb-4">
        ${price}<span className="text-lg text-gray-400">/month</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="text-gray-300 flex items-center">
            <span className="text-green-500 mr-2">✓</span> {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Start 7-Day Free Trial`}
      </button>
      <p className="text-sm text-gray-500 mt-4 text-center">Cancel anytime • No credit card required for trial</p>
    </div>
  );
}
```

---

## Step 10: Pricing Page

**File:** `app/pricing/page.tsx`

```typescript
import SubscribeButton from '@/components/SubscribeButton';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Choose Your Bot</h1>
          <p className="text-xl text-gray-400">Start with a 7-day free trial</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <SubscribeButton
            priceId={process.env.NEXT_PUBLIC_PRICE_RAMMSTEIN!}
            productName="RAmmStein Pro"
            price={99}
            features={[
              'Hyperliquid futures bot',
              'AI-powered signals',
              'Real-time monitoring',
              'Discord support',
              'Weekly performance reports'
            ]}
          />

          <SubscribeButton
            priceId={process.env.NEXT_PUBLIC_PRICE_MES!}
            productName="MES Master"
            price={149}
            features={[
              'MES options income',
              'Credit spread strategies',
              'Greeks monitoring',
              'Priority support',
              'Weekly performance reports'
            ]}
          />

          <SubscribeButton
            priceId={process.env.NEXT_PUBLIC_PRICE_COMPLETE!}
            productName="Complete"
            price={199}
            features={[
              'Both RAmmStein + MES Master',
              'Full framework access',
              'Priority Discord support',
              'Weekly 1-on-1 calls',
              'Custom strategy development'
            ]}
          />
        </div>
      </div>
    </div>
  );
}
```

---

## Step 11: Test Purchase

### Test Card
```
Number: 4242 4242 4242 4242
MM/YY: 12/25
CVC: 123
Zip: 12345
```

### Expected Flow
1. Click "Start Free Trial"
2. Enter email + test card
3. Confirm subscription
4. Redirect to success page
5. Webhook receives `checkout.session.completed`
6. Customer gets 7-day trial

---

## Step 12: Go Live Checklist

- [ ] Switch to live API keys
- [ ] Confirm webhook endpoint is HTTPS
- [ ] Set up Zoho Mail for customer emails
- [ ] Add terms of service page
- [ ] Add privacy policy page
- [ ] Test cancellation flow
- [ ] Connect bank account in Stripe Dashboard
- [ ] Set up Stripe Tax (if applicable)

---

## Quick Reference

### Test Card
```
4242 4242 4242 4242
12/25
123
```

### URLs
- **Dashboard:** https://dashboard.stripe.com
- **Test:** https://dashboard.stripe.com/test
- **Live:** https://dashboard.stripe.com

### Commands
```bash
# Start webhook listener
stripe listen --forward-to localhost:3000/api/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

---

## Revenue Projection

| Product | Price | Monthly Customers | Monthly Revenue |
|---------|-------|-------------------|-----------------|
| RAmmStein Pro | $99 | 10 | $990 |
| MES Master | $149 | 5 | $745 |
| Complete | $199 | 3 | $597 |
| **Total** | - | 18 | **$2,332/month** |

Target: 100 subscribers = $15,000/month MRR

---

**Ready? Let's get that first subscriber! 🚀**
