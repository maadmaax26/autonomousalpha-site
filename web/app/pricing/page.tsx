'use client'

import { useEffect, useState } from 'react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <main className="min-h-screen bg-slate-950 py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mb-6">
            🚀 PDF Delivered Instantly After Purchase
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Trading Playbook</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Get instant access to the complete MES Options and Hyperliquid Crypto strategies. 
            One-time payment. Lifetime updates.
          </p>
        </div>

        {/* MES Options Playbook - Featured */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-900/50 to-violet-900/50 p-1">
            <div className="rounded-3xl bg-slate-900/90 p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left: Product Info */}
                <div className="flex-1">
                  <div className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400 mb-4">
                    ⭐ BEST SELLER
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">The MES Options Playbook</h2>
                  <p className="text-2xl font-bold text-indigo-400 mb-6">$29.00</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <div>
                        <p className="text-white font-medium">3 Entry Windows Explained</p>
                        <p className="text-slate-400 text-sm">PM (same-day), AM (overnight), Gap capture</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <div>
                        <p className="text-white font-medium">VIX-Based Strategy Routing</p>
                        <p className="text-slate-400 text-sm">Complete decision trees for VIX &lt;20, 20-30, &gt;30</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <div>
                        <p className="text-white font-medium">70% Win Rate Strategy</p>
                        <p className="text-slate-400 text-sm">Backtested through 2023-2024 volatility</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <div>
                        <p className="text-white font-medium">Complete Python Code Included</p>
                        <p className="text-slate-400 text-sm">Ready to deploy on TastyTrade Paper → Live</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a 
                    href="https://buy.stripe.com/dRm4gr21Eg5WcF214cdf"
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white hover:bg-indigo-500 transition-all w-full lg:w-auto"
                  >
                    Buy Now — $29.00
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <p className="text-slate-500 text-sm mt-3">PDF delivered instantly via email</p>
                </div>

                {/* Right: Preview */}
                <div className="lg:w-80 flex-shrink-0">
                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <h4 className="text-white font-mono text-sm mb-2">📘 AI_TRADING_PLAYBOOK_v2_2.pdf</h4>
                    <div className="space-y-2 text-xs text-slate-400 font-mono">
                      <p>├── strategies/</p>
                      <p>│   ├── 01_pm_options.py</p>
                      <p>│   ├── 02_am_overnight.py</p>
                      <p>│   └── 03_gap_capture.py</p>
                      <p>├── vix_routing/</p>
                      <p>│   ├── strategy_selector.py</p>
                      <p>│   └── high_vix_mode.py</p>
                      <p>├── requirements.txt</p>
                      <p>└── README.md (120+ pages)</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between text-xs">
                      <span className="text-slate-500">Size: 612 KB</span>
                      <span className="text-emerald-400">✓ Ready to download</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Bots */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Or Go Fully Autonomous</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* RAmmStein */}
            <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700 hover:border-indigo-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">RAmmStein Pro</h4>
                  <p className="text-slate-400 text-sm">Hyperliquid Perps Scalper</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-white">$99</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm mb-6">
                <li>✓ Real-time AI analysis</li>
                <li>✓ Auto TP/SL execution</li>
                <li>✓ Kelly position sizing</li>
                <li>✓ 24/7 automated trading</li>
              </ul>
              <button className="w-full rounded-xl bg-slate-700 py-3 text-white font-medium hover:bg-slate-600 transition-all">
                Coming Soon
              </button>
            </div>

            {/* MES Master */}
            <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700 hover:border-violet-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">MES Master</h4>
                  <p className="text-slate-400 text-sm">Options Income Bot</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-white">$149</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm mb-6">
                <li>✓ 3 entry windows daily</li>
                <li>✓ VIX-based routing</li>
                <li>✓ 70% historical win rate</li>
                <li>✓ Auto paper → live ready</li>
              </ul>
              <button className="w-full rounded-xl bg-slate-700 py-3 text-white font-medium hover:bg-slate-600 transition-all">
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Secure Stripe Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Instant PDF Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">30-Day Support Included</span>
          </div>
        </div>
      </div>
    </main>
  )
}
