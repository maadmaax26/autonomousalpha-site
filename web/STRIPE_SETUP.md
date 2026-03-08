# Stripe Setup Guide - AutonomousAlpha

## Overview
Complete Stripe integration for selling AI Trading products.

---

## Step 1: Create Stripe Account

### Sign Up
```
https://dashboard.stripe.com/register
```

**Required:**
- Email: hello@autonomousalpha.io (recommended, or your current)
- Business name: AutonomousAlpha
- Industry: Software/Digital Products
- Website: autonomousalpha.io (or placeholder)

---

## Step 2: Get API Keys

1. Go to **Developers > API keys**
2. Copy **Publishable key** (pk_test_*)
3. Create **Secret key** (sk_test_*)
4. For production: Repeat for live keys (pk_live_*, sk_live_*)

---

## Step 3: Environment Variables

Create `.env.local` in your Next.js project:

```bash
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Product Configuration
PLAYBOOK_PRICE_ID=price_YOUR_PLAYBOOK_PRICE_ID
STRATEGY_PACK_PRICE_ID=price_YOUR_STRATEGY_PACK_PRICE_ID
STARTER_KIT_PRICE_ID=price_YOUR_STARTER_KIT_PRICE_ID

# Domain
NEXT_PUBLIC_DOMAIN=http://localhost:3000  # Change for production
```

**Secure the files:**
```bash
chmod 600 .env.local
```

---

## Step 4: Create Products in Stripe Dashboard

### Product 1: AI Trading Playbook
```yaml
Name: AI Trading Playbook
Description: 120+ page guide with 5 battle-tested strategies
Price: $99.00 (one-time)
```

### Product 2: Strategy Pack
```yaml
Name: Strategy Pack
Description: 10 Python trading strategies with backtests
Price: $49.00 (one-time)
```

### Product 3: Complete Starter Kit
```yaml
Name: Complete Starter Kit
Description: Everything you need to start trading with bots
Price: $249.00 (one-time)
```

### OR: Create via API
```bash
# Install Stripe CLI
curl -s https://packages.stripe.dev/api/security/stripe-cli/gpgpgp_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/api/stripe-cli/debian stable main" | sudo tee /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe

# Login
stripe login

# Create products via CLI
stripe products create --name="AI Trading Playbook" --description="120+ pages of strategies"
stripe prices create --product=prod_xxx --unit-amount=9900 --currency=usd
```

---

## Step 5: Install Stripe SDK

```bash
cd /home/efinney/.openclaw/workspace/business/autonomous-alpha/web

# Install dependencies
npm install stripe @stripe/stripe-js
npm install @stripe/react-stripe-js  # If using React components
```

---

## Step 6: API Routes

### Create Checkout Session
**File:** `app/api/checkout/route.ts`

```typescript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const { priceId, email } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        product: 'AI Trading Playbook',
      },
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
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

### Webhook Handler
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

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Send product email
      await sendProductEmail(session.customer_email!, session.metadata?.product!);
      
      console.log(`✅ Payment successful: ${session.customer_email}`);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.error(`❌ Payment failed: ${failedPayment.last_payment_error?.message}`);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function sendProductEmail(email: string, product: string) {
  // Implement via SendGrid/Resend/Zoho
  console.log(`Sending ${product} to ${email}`);
}
```

---

## Step 7: Payment Button Component

**File:** `components/PaymentButton.tsx`

```typescript
'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentButtonProps {
  priceId: string;
  productName: string;
  amount: number;
}

export default function PaymentButton({ priceId, productName, amount }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId,
          email: '', // Will be filled by Stripe
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
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Buy Now - $${amount}`}
    </button>
  );
}
```

---

## Step 8: Integration in Pages

**Update:** `app/products/playbook/page.tsx`

```typescript
import PaymentButton from '@/components/PaymentButton';

export default function PlaybookPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">AI Trading Playbook</h1>
      
      {/* Product details... */}
      
      <div className="mt-8">
        <PaymentButton 
          priceId={process.env.NEXT_PUBLIC_PLAYBOOK_PRICE_ID!}
          productName="AI Trading Playbook"
          amount={99}
        />
      </div>
    </div>
  );
}
```

---

## Step 9: Success Page

**File:** `app/success/page.tsx`

```typescript
import { Suspense } from 'react';
import SuccessContent from './SuccessContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
```

**File:** `app/success/SuccessContent.tsx`

```typescript
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => setStatus(data.status))
        .catch(() => setStatus('error'));
    }
  }, [sessionId]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h1>
      <p className="text-xl mb-8">
        Check your email for your AI Trading Playbook download link.
      </p>
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-gray-600">
          Order: {sessionId?.slice(-12)}
        </p>
        <p className="text-gray-600 mt-2">
          Status: {status}
        </p>
      </div>
    </div>
  );
}
```

---

## Step 10: Test Purchase

### Using Stripe Test Cards

| Card Number | CVC | Date | Result |
|-------------|-----|------|--------|
| 4242 4242 4242 4242 | Any 3 digits | Any future date | ✅ Success |
| 4000 0000 0000 0002 | Any 3 digits | Any future date | ❌ Declined |
| 4000 0000 0000 3220 | Any 3 digits | Any future date | 3D Secure |

### Test Webhook
```bash
# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhook

# Copy webhook signing secret to .env.local
```

---

## Step 11: Go Live Checklist

- [ ] Switch to live API keys (pk_live_*, sk_live_*)
- [ ] Confirm webhook endpoint is HTTPS
- [ ] Set up Zoho Mail for hello@autonomousalpha.io
- [ ] Add actual product files for delivery
- [ ] Test end-to-end purchase flow
- [ ] Enable Stripe tax (if needed)
- [ ] Connect bank account in Stripe Dashboard

---

## Quick Reference

### Test Card
```
4242 4242 4242 4242
12/25
123
```

### Webhook Events to Monitor
- `checkout.session.completed` - ✅ Payment successful
- `payment_intent.payment_failed` - ❌ Payment declined
- `charge.refunded` - 💰 Refund processed

### Stripe Dashboard URLs
- **Test:** https://dashboard.stripe.com/test
- **Live:** https://dashboard.stripe.com

---

**Next:** Setup Zoho Mail for hello@autonomousalpha.io to deliver products automatically.
