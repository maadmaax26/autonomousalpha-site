#!/bin/bash
# Start AutonomousAlpha Webhook Server with ngrok (permanent URL)
# Uses the configured ngrok URL: https://courtney-unreposeful-slower.ngrok-free.dev

cd /home/efinney/.openclaw/workspace/business/autonomous-alpha

echo "================================"
echo "  AutonomousAlpha Webhook Server"
echo "================================"
echo ""

# Load environment
export $(grep -v '^#' .env | xargs)

# Kill existing processes
pkill -f "webhook_server.py" 2>/dev/null
pkill -f "ngrok http 5000" 2>/dev/null
sleep 2

# Start webhook server
echo "🚀 Starting webhook server..."
nohup python3 webhook_server.py > webhook.log 2>&1 &
echo $! > webhook.pid
sleep 2

if pgrep -f "webhook_server.py" > /dev/null; then
    echo "✅ Webhook server running on port 5000"
else
    echo "❌ Webhook server failed to start"
    exit 1
fi

# Start ngrok on port 5000
echo "🌐 Starting ngrok tunnel to port 5000..."
ngrok http 5000 > ngrok.log 2>&1 &
echo $! > ngrok.pid
sleep 5

# Get the URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | grep -o '"public_url":"https://[^"]*' | head -1 | sed 's/"public_url":"//g')

if [ -n "$NGROK_URL" ]; then
    echo ""
    echo "================================"
    echo "  ✅ WEBHOOK READY"
    echo "================================"
    echo ""
    echo "🌐 Current ngrok URL: $NGROK_URL"
    echo ""
    echo "📋 IMPORTANT: Update Stripe with this URL:"
    echo "   $NGROK_URL/webhook/stripe"
    echo ""
    echo "🔔 Trade alerts endpoint:"
    echo "   $NGROK_URL/api/trade-alert"
    echo ""
    echo "📊 Status check:"
    echo "   $NGROK_URL/api/bot-status"
    echo ""
    echo "🛑 To stop: ./stop_webhook.sh"
else
    echo "⚠️  ngrok URL not ready yet - check ngrok.log"
fi
