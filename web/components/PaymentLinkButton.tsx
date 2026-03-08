'use client';

import { useState } from 'react';

interface PaymentLinkButtonProps {
  amount: number;
  productName: string;
  paymentLink?: string;
}

export default function PaymentLinkButton({ 
  amount, 
  productName,
  paymentLink = process.env.NEXT_PUBLIC_PAYMENT_LINK!
}: PaymentLinkButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    // Redirect to Stripe Payment Link
    window.location.href = paymentLink;
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Redirecting...
        </span>
      ) : (
        `Buy Now - $${amount}`
      )}
    </button>
  );
}
