# AutonomousAlpha Webhook Setup Guide

## What It Does

Automatically sends the AI Trading Playbook PDF to customers after Stripe purchase.

**Flow:**
```
Customer pays → Stripe triggers webhook → Email sent with PDF → Purchase logged
```

---

## Quick Start

### 1. Install Dependencies

```bash
cd /home/efinney/.openclaw/workspace/business/autonomous-alpha
pip3 install flask
```

### 2. Configure Email (Gmail Recommended)

**A. Enable 2-Factor Auth on Gmail:**
- https://myaccount.google.com/security

**B. Create App Password:**
- Go to: https://myaccount.google.com/apppasswords
- Select "Mail", device "Other", name "AutonomousAlpha"
- Copy the 16-character password

**C. Configure Environment Variables:**
```bash
cat > .env << 'EOF'
SMTP_USER=your.email@gmail.com
SMTP_PASS=xxxxx xxxxx xxxxx xxxxx  # Your app password (16 chars)
FROM_EMAIL=support@autonomousalpha.io
EOF
```

### 3. Run the Server

```bash
cd /home/efinney/.openclaw/workspace/business/autonomous-alpha
python3 webhook_server.py
```

Server runs on: `http://localhost:5000`

**Test it:**
```bash
curl http://localhost:5000/health
```

---

## 4. Connect Stripe Webhook

### A. Expose Local Server (Use ngrok)

```bash
# Install ngrok
npm install -g ngrok

# Expose port 5000
ngrok http 5000
```

Copy the HTTPS URL (looks like: `https://abc123.ngrok.io`)

### B. Add Stripe Webhook Endpoint

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "+ Add endpoint"
3. Endpoint URL: `https://your-ngrok-url.ngrok.io/webhook/stripe`
4. Events to listen for: `checkout.session.completed`
5. Click "Add endpoint"

**Copy the Signing Secret** (starts with `whsec_`)

### C. Add Secret to .env

```bash
echo "STRIPE_WEBHOOK_SECRET=whsec_xxxx" >> .env
```

---

## 5. Test Purchase Flow

### A. Stripe Test Mode
- Go to: https://dashboard.stripe.com/test/payment-links
- Create test payment link
- Set price to $0.01

### B. Make Test Purchase
- Use Stripe test card: `4242 4242 4242 4242`
- Any future expiry, any CVC
- Use your email

### C. Check Results
- Webhook server console shows: "[EMAIL] Sent to..."
- Check your email inbox
- Check `purchases.log` file

---

## Production Deployment

### Option 1: Vercel (Free)

```bash
npm i -g vercel
cd /home/efinney/.openclaw/workspace/business/autonomous-alpha
vercel --prod
```

Set environment variables in Vercel dashboard.

### Option 2: Permanent Hosting with ngrok

Get stable URL with ngrok paid plan: https://ngrok.com/pricing

### Option 3: VPS/Server

Deploy to DigitalOcean, AWS, etc. and use that URL.

---

## Files Created

| File | Purpose |
|------|---------|
| `webhook_server.py` | Main webhook handler |
| `webhook.env.example` | Configuration template |
| `purchases.log` | Purchase records (auto-created) |
| `.env` | Your secrets (don't commit!) |

---

## Troubleshooting

### Email not sending?
- Check SMTP_USER and SMTP_PASS
- Gmail needs App Password (not regular password)
- Check `.env` file is loaded

### Webhook not received?
- Check ngrok is running
- Verify Stripe webhook URL is correct
- Check server is running (port 5000)

### PDF not found?
- Verify path: `products/playbook.pdf`
- File must exist before purchase

---

## Security Notes

⚠️ **Never commit `.env` file** — it contains passwords

The `.gitignore` already blocks `.env` files.

**Test mode only** until you're confident, then switch to live Stripe keys.

---

## Support

Questions? Check:
- Flask docs: https://flask.palletsprojects.com
- Stripe webhooks: https://stripe.com/docs/webhooks
- Gmail app passwords: https://support.google.com/accounts/answer/185833