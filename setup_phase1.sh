#!/bin/bash
# Setup script for AutonomousAlpha Phase 1 launch
# Run this after creating Stripe account

set -e

echo "======================================================================"
echo "🚀 AutonomousAlpha Phase 1 Setup"
echo "======================================================================"

# Check for Stripe key
if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo "❌ Error: STRIPE_SECRET_KEY not set"
    echo "   export STRIPE_SECRET_KEY=sk_test_xxxxx"
    exit 1
fi

echo ""
echo "Step 1: Creating Stripe products..."
echo "----------------------------------------------------------------------"
cd /home/efinney/.openclaw/workspace/business/autonomous-alpha
python3 setup_stripe_products.py

echo ""
echo "Step 2: Setting up web project..."
echo "----------------------------------------------------------------------"

# Create necessary directories
mkdir -p web/app/api/checkout
mkdir -p web/app/api/webhook
mkdir -p web/app/pricing
mkdir -p web/components

# Install dependencies
echo "Installing npm packages..."
cd web
npm install stripe @stripe/stripe-js @stripe/react-stripe-js

echo ""
echo "Step 3: Creating .env.local template..."
echo "----------------------------------------------------------------------"

cat > .env.local << 'EOF'
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Product Price IDs (will be filled by setup_stripe_products.py)
NEXT_PUBLIC_PRICE_RAMMSTEIN_PRO=price_xxxxx
NEXT_PUBLIC_PRICE_MES_MASTER=price_xxxxx
NEXT_PUBLIC_PRICE_AUTONOMOUSALPHA_COMPLETE=price_xxxxx

# Domain
NEXT_PUBLIC_DOMAIN=http://localhost:3000
EOF

echo "✅ Created .env.local template"

echo ""
echo "======================================================================"
echo "📋 Next Steps:"
echo "======================================================================"
echo ""
echo "1. Get your Stripe Publishable key:"
echo "   https://dashboard.stripe.com/apikeys"
echo "   → Copy pk_test_xxxxx or pk_live_xxxxx"
echo ""
echo "2. Update .env.local with your keys:"
echo "   nano .env.local"
echo ""
echo "3. Run webhook listener (for local testing):"
echo "   stripe listen --forward-to localhost:3000/api/webhook"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "5. Open http://localhost:3000/pricing"
echo ""
echo "6. Test purchase with test card:"
echo "   4242 4242 4242 4242"
echo "   12/25"
echo "   123"
echo ""
echo "======================================================================"
echo "🎉 Setup complete!"
echo "======================================================================"
