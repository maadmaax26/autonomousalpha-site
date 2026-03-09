from flask import Flask, request, jsonify
import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
import hashlib

app = Flask(__name__)

# Configuration
STRIPE_WEBHOOK_SECRET = os.getenv('STRIPE_WEBHOOK_SECRET', '')
PDF_PATH = '/home/efinney/.openclaw/workspace/business/autonomous-alpha/products/playbook.pdf'
LOG_FILE = '/home/efinney/.openclaw/workspace/business/autonomous-alpha/purchases.log'

# Email config (set these as env vars)
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USER = os.getenv('SMTP_USER', '')
SMTP_PASS = os.getenv('SMTP_PASS', '')
FROM_EMAIL = os.getenv('FROM_EMAIL', 'noreply@autonomousalpha.io')

def log_purchase(customer_email, amount, payment_id):
    """Log purchase to file"""
    timestamp = datetime.now().isoformat()
    log_entry = f"{timestamp} | {customer_email} | ${amount} | {payment_id}\n"
    
    with open(LOG_FILE, 'a') as f:
        f.write(log_entry)
    
    print(f"[LOG] Purchase recorded: {customer_email}")

def send_email_with_pdf(to_email, subject, body, pdf_path):
    """Send email with PDF attachment"""
    if not os.path.exists(pdf_path):
        print(f"[ERROR] PDF not found: {pdf_path}")
        return False
    
    if not SMTP_USER or not SMTP_PASS:
        print("[ERROR] Email credentials not configured")
        return False
    
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = FROM_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Attach body
        msg.attach(MIMEText(body, 'plain'))
        
        # Attach PDF
        with open(pdf_path, 'rb') as f:
            pdf_data = f.read()
        
        pdf_part = MIMEBase('application', 'octet-stream')
        pdf_part.set_payload(pdf_data)
        encoders.encode_base64(pdf_part)
        pdf_part.add_header('Content-Disposition', 'attachment; filename="AI_Trading_Playbook.pdf"')
        msg.attach(pdf_part)
        
        # Send email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
        server.quit()
        
        print(f"[EMAIL] Sent to {to_email}")
        return True
        
    except Exception as e:
        print(f"[ERROR] Email failed: {e}")
        return False

@app.route('/webhook/stripe', methods=['POST'])
def stripe_webhook():
    """Handle Stripe webhook for successful payments"""
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature', '')
    
    # Log webhook received
    print(f"[WEBHOOK] Received at {datetime.now().isoformat()}")
    
    try:
        # In production, verify signature with STRIPE_WEBHOOK_SECRET
        # For now, parse the event directly
        event = json.loads(request.data)
        
        # Handle checkout completion
        if event.get('type') == 'checkout.session.completed':
            session = event['data']['object']
            
            customer_email = session.get('customer_email') or session.get('customer_details', {}).get('email')
            amount = session.get('amount_total', 0) / 100  # Convert cents to dollars
            payment_id = session.get('id')
            
            if not customer_email:
                print("[ERROR] No customer email in session")
                return jsonify({'error': 'No email'}), 400
            
            # Log purchase
            log_purchase(customer_email, amount, payment_id)
            
            # Send email with PDF
            subject = "Your AI Trading Playbook is Ready!"
            body = f"""
Hi there,

Thanks for purchasing the AI Trading Playbook!

Your playbook is attached to this email. Here's what's inside:

📘 120+ pages of trading bot strategies
💻 Complete Python source code
📊 60-day backtest results
🚀 Step-by-step deployment guides

Trading bots are coming Q2 2025. You're now on the early access list.

Questions? Reply to this email.

Happy trading,
The AutonomousAlpha Team
"""
            
            success = send_email_with_pdf(customer_email, subject, body, PDF_PATH)
            
            if success:
                return jsonify({'status': 'success', 'email_sent': True}), 200
            else:
                return jsonify({'status': 'success', 'email_sent': False}), 200
                
        return jsonify({'status': 'ignored', 'event': event.get('type')}), 200
        
    except Exception as e:
        print(f"[ERROR] Webhook processing failed: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    print("Starting AutonomousAlpha webhook server...")
    print(f"PDF path: {PDF_PATH}")
    print(f"Log file: {LOG_FILE}")
    app.run(host='0.0.0.0', port=5000, debug=False)