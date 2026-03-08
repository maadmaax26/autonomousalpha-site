'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SubscribeButtonProps {
  priceId: string;
  productName: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export default function SubscribeButton({ 
  priceId, 
  productName, 
  price, 
  features,
  popular = false 
}: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId,
          customerEmail: '',
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
    <div className={`bg-gray-900 rounded-xl p-8 border ${popular ? 'border-green-500 ring-2 ring-green-500/20' : 'border-gray-800'} relative`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}
      
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
        className={`w-full font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 ${
          popular 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white' 
            : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
        }`}
      >
        {loading ? 'Processing...' : 'Start 7-Day Free Trial'}
      </button>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Cancel anytime • No credit card required for trial
      </p>
    </div>
  );
}
