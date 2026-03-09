#!/usr/bin/env python3
"""
Stripe Subscription Product Setup
Creates products in Stripe for AutonomousAlpha

Usage:
    python3 setup_stripe_products.py
    
Requires STRIPE_SECRET_KEY environment variable
"""

import os
import sys

try:
    import stripe
except ImportError:
    print("Installing stripe...")
    os.system("pip3 install stripe")
    import stripe

# Configuration
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')

if not STRIPE_SECRET_KEY:
    print("❌ Error: Set STRIPE_SECRET_KEY environment variable")
    print("   export STRIPE_SECRET_KEY=sk_test_xxxxx")
    sys.exit(1)

stripe.api_key = STRIPE_SECRET_KEY

PRODUCTS = [
    {
        "name": "RAmmStein Pro",
        "description": "AI-powered trading bot for Hyperliquid perpetuals futures",
        "price": 9900,  # $99.00 in cents
    },
    {
        "name": "MES Master",
        "description": "Options income bot for Micro E-mini S\u0026P 500 futures",
        "price": 14900,  # $149.00
    },
    {
        "name": "AutonomousAlpha Complete",
        "description": "Both RAmmStein + MES Master + full framework access",
        "price": 19900,  # $199.00
    }
]

def create_products():
    """Create products and prices in Stripe"""
    print("=" * 60)
    print("🚀 Creating Stripe Subscription Products")
    print("=" * 60)
    
    created_products = []
    
    for product_data in PRODUCTS:
        try:
            # Create product
            product = stripe.Product.create(
                name=product_data["name"],
                description=product_data["description"],
                metadata={
                    "type": "subscription",
                    "category": "trading_bot"
                }
            )
            
            # Create recurring price
            price = stripe.Price.create(
                product=product.id,
                unit_amount=product_data["price"],
                currency="usd",
                recurring={
                    "interval": "month",
                    "interval_count": 1
                },
                metadata={
                    "trial_days": "7"
                }
            )
            
            print(f"\n✅ {product_data['name']}")
            print(f"   Product ID: {product.id}")
            print(f"   Price ID:   {price.id}")
            print(f"   Price:      ${product_data['price']/100:.2f}/month")
            
            created_products.append({
                "name": product_data["name"],
                "product_id": product.id,
                "price_id": price.id,
                "price": product_data["price"]
            })
            
        except Exception as e:
            print(f"\n❌ Error creating {product_data['name']}: {e}")
    
    # Print summary
    print("\n" + "=" * 60)
    print("📋 Environment Variables (.env.local)")
    print("=" * 60)
    
    for p in created_products:
        key = p["name"].upper().replace(" ", "_").replace("-", "_")
        print(f"NEXT_PUBLIC_PRICE_{key}={p['price_id']}")
    
    # Save to file
    env_file = os.path.expanduser("~/.openclaw/workspace/business/stripe_products.env")
    with open(env_file, 'w') as f:
        f.write("# Stripe Products - AutonomousAlpha\n\n")
        for p in created_products:
            key = p["name"].upper().replace(" ", "_").replace("-", "_")
            f.write(f"NEXT_PUBLIC_PRICE_{key}={p['price_id']}\n")
    
    print(f"\n💾 Saved to: {env_file}")
    print("\n" + "=" * 60)
    print("🎉 Done! Copy the price IDs above to your .env.local file")
    print("=" * 60)

def check_existing():
    """List existing products"""
    print("\n📊 Existing Products:")
    print("-" * 60)
    
    products = stripe.Product.list(limit=10)
    for product in products.auto_paging_iter():
        prices = stripe.Price.list(product=product.id, limit=1)
        if prices.data:
            price = prices.data[0]
            print(f"✓ {product.name}")
            print(f"  Product: {product.id}")
            print(f"  Price:   {price.id}")
            print()

def delete_all_products():
    """DANGER: Delete all products"""
    print("⚠️  This will delete ALL products in Stripe!")
    confirm = input("Type 'DELETE' to confirm: ")
    
    if confirm != "DELETE":
        print("Cancelled.")
        return
    
    products = stripe.Product.list(limit=100)
    for product in products.auto_paging_iter():
        try:
            stripe.Product.modify(product.id, active=False)
            print(f"✅ Archived: {product.name}")
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Stripe Product Setup")
    parser.add_argument("--check", action="store_true", help="List existing products")
    parser.add_argument("--delete", action="store_true", help="Delete all products (DANGER)")
    
    args = parser.parse_args()
    
    if args.check:
        check_existing()
    elif args.delete:
        delete_all_products()
    else:
        create_products()
