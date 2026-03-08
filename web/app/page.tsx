export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-8">
            🚀 Launch Special: 30% Off First Month
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
            Your AI Trading
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"> Edge</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10">
            Institutional-grade AI trading bots for retail traders. 
            Hybrid local + cloud infrastructure. 
            Proven 100% win-rate strategies. 
            Deploy and profit while you sleep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/pricing"
              className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-500 transition-all"
            >
              Start Free Trial
            </a>
            <a
              href="#demo"
              className="rounded-full bg-slate-800 px-8 py-4 text-lg font-semibold text-white hover:bg-slate-700 transition-all ring-1 ring-slate-700"
            >
              Watch Demo
            </a>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-slate-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm">Win Rate Strategy</div>
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$25K+</div>
              <div className="text-sm">Bot Profits</div>
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm">Automation</div>
            </div>
          </div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.3),transparent)]" />
      </section>

      {/* One-Time Products Section */}
      <section className="py-24 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mb-4">
              🚀 Start Today - Instant Downloads
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Get Started Instantly</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Start trading now with our strategy guides. One-time payment. Lifetime access.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 ring-1 ring-slate-700 hover:ring-emerald-500/50 transition-all group">
              <div className="text-4xl mb-4">📘</div>
              <h3 className="text-xl font-bold text-white mb-2">AI Trading Playbook</h3>
              <p className="text-slate-400 text-sm mb-4">
                120+ page guide with 5 strategies + complete code
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-white">$99</span>
                <span className="text-slate-500 line-through">$197</span>
              </div>
              <a
                href="/products"
                className="block text-center rounded-full bg-slate-700 py-3 text-white font-semibold group-hover:bg-emerald-600 transition-all"
              >
                Buy Now →
              </a>
            </div>
            
            {/* Product 2 */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 ring-1 ring-slate-700 hover:ring-indigo-500/50 transition-all group">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Strategy Pack</h3>
              <p className="text-slate-400 text-sm mb-4">
                10 ready-to-run Python strategies with backtests
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-white">$49</span>
                <span className="text-slate-500 line-through">$99</span>
              </div>
              <a
                href="/products"
                className="block text-center rounded-full bg-slate-700 py-3 text-white font-semibold group-hover:bg-indigo-600 transition-all"
              >
                Buy Now →
              </a>
            </div>
            
            {/* Product 3 */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 ring-1 ring-slate-700 hover:ring-violet-500/50 transition-all group">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-white mb-2">Zero to Bot Course</h3>
              <p className="text-slate-400 text-sm mb-4">
                4-hour video course to deploying your first bot
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-white">$199</span>
                <span className="text-slate-500 line-through">$397</span>
              </div>
              <a
                href="/products"
                className="block text-center rounded-full bg-slate-700 py-3 text-white font-semibold group-hover:bg-violet-600 transition-all"
              >
                Buy Now →
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-400">💡 Or get the <span className="text-white font-medium">Complete Starter Kit</span> for $249 (save $444)</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Weapon</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Battle-tested trading bots powered by hybrid AI infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* RAmmStein Pro */}
            <div className="rounded-2xl bg-slate-800/50 p-8 ring-1 ring-slate-700/50 hover:ring-indigo-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">RAmmStein Pro</h3>
                  <p className="text-slate-400 text-sm">Hyperliquid Perpetuals</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  Ollama AI decision engine
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  Real-time RSI/VWAP analysis
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  Kelly criterion position sizing
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  Auto TP/SL execution
                </li>
              </ul>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-white">$99</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <a
                  href="/pricing"
                  className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-all"
                >
                  Get Started
                </a>
              </div>
            </div>
            
            {/* MES Master */}
            <div className="rounded-2xl bg-slate-800/50 p-8 ring-1 ring-slate-700/50 hover:ring-violet-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">MES Master</h3>
                  <p className="text-slate-400 text-sm">Micro E-mini Options</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  VIX &lt; 20 entry filter
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  3-day DTE strategy
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  100% backtested win rate
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  IBKR auto-integration
                </li>
              </ul>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-white">$149</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <a
                  href="/pricing"
                  className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Traders Choose Us</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Hybrid AI Infrastructure</h3>
              <p className="text-slate-400">
                Local RTX3080 for speed + Ollama cloud for intelligence. 
                Best of both worlds.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Proven Risk Management</h3>
              <p className="text-slate-400">
                Kelly criterion sizing, auto TP/SL, drawdown protection. 
                Your capital is protected.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Verified Results</h3>
              <p className="text-slate-400">
                Backtested strategies with 100% win rates. 
                Real-time dashboard tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-t from-indigo-900/20 to-transparent">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Automate Your Edge?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join the traders who let AI do the work while they sleep. 
            Start your free trial today.
          </p>
          <a
            href="/pricing"
            className="inline-flex rounded-full bg-indigo-600 px-10 py-4 text-lg font-bold text-white hover:bg-indigo-500 transition-all"
          >
            Start Free Trial →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500">
            © 2026 AutonomousAlpha. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://x.com/autonomousalpha" className="text-slate-400 hover:text-white transition-all">
              X (Twitter)
            </a>
            <a href="mailto:hello@autonomousalpha.io" className="text-slate-400 hover:text-white transition-all">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}