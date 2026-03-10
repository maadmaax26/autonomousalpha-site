#!/bin/bash
# Stop AutonomousAlpha Webhook Server
cd /home/efinney/.openclaw/workspace/business/autonomous-alpha

echo "Stopping webhook services..."

if [ -f webhook.pid ]; then
    kill $(cat webhook.pid) 2>/dev/null
    rm webhook.pid
fi

if [ -f lt.pid ]; then
    kill $(cat lt.pid) 2>/dev/null
    rm lt.pid
fi

pkill -f "python3 webhook_server.py" 2>/dev/null
pkill -f "lt -p 5000" 2>/dev/null

echo "✅ Webhook server stopped"
