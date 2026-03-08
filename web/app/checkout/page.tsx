'use client'

import { useState } from 'react'

const PRODUCTS = {
  playbook: {
    name: 'AI Trading Playbook',
    price: 99,
    originalPrice: 197,
    description: 'Complete guide + source code + AI prompts',
  },
  strategies: {
    name: 'Strategy Pack',
    price: 49,
    originalPrice: 99,
    description: '10 ready-to-run trading strategies',
  },
  course: {
    name: 'Zero to Bot Course',
    price: 199,
    originalPrice: 397,
    description: '4-hour video course to deploying your first bot',
  },
  bundle: {
    name: 'Complete Starter Kit',
    price: 249,
    originalPrice: 693,
    description: 'Playbook + Strategy Pack + Course',
  },
}

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { product?: string }
}) {
  const productKey = searchParams.product || 'playbook'
  const product = PRODUCTS[productKey as keyof typeof PRODUCTS]
  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // In production, this would call Stripe Checkout
    // For now, simulate a purchase
    setTimeout(() => {
      alert(`Thanks! Your ${product.name} has been sent to ${email}`)
      setLoading(false)
    }, 1500)
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Product not found</div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <a href="/products" className="text-slate-400 hover:text-white">
            ← Back to products
          </a>
        </div>
        
        <div className="rounded-2xl bg-slate-900 p-8 ring-1 ring-slate-800">
          <div className="text-center mb-8">
            <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400 mb-4">
              🔓 Instant Access
            </div>
            
            <h1 className="text-2xl font-bold text-white">{product.name}</h1>
            
            <p className="text-slate-400 mt-2">{product.description}</p>
          </div>
          
          <form onSubmit={handleCheckout}>
            <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-300">Subtotal</span>
                <span className="text-white">${product.originalPrice}</span>
              </div>
              
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-300">Launch Discount</span>
                <span className="text-emerald-400">
                  -${product.originalPrice - product.price}
                </span>
              </div>
              
              
              <div className="border-t border-slate-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-white">${product.price}</span>
                </div>
              </div>
            </div>
            
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email for delivery
              </label>
              
              
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            
            
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-emerald-600 py-4 text-white font-bold hover:bg-emerald-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay $${product.price} →`}
            </button>
          </form>
          
          
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>🔒 Secure payment by Stripe</p>
            
            <p className="mt-2">60-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  )
}
