export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="py-24 px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mb-6">
            🚀 Instant Download - Start Trading Today
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Strategy Guides & Tools</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            One-time purchases to accelerate your trading. Instant download. 
            Lifetime access.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Product 1: Strategy Playbook */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 ring-1 ring-slate-700 hover:ring-emerald-500/50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-500/20 mb-6">
              <span className="text-3xl">📘</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              AI Trading Playbook
            </h2>
            
            <p className="text-slate-400 text-sm mb-4">
              The complete guide to building profitable AI trading bots
            </p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$99</span>
              <span className="text-slate-500 line-through ml-2">$197</span>
              <div className="text-emerald-400 text-sm mt-1">50% Launch Discount</div>
            </div>
            
            <ul className="space-y-3 text-slate-300 mb-8 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                120+ page comprehensive guide
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                5 proven trading strategies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                Complete Python source code
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                Step-by-step setup videos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                AI prompt templates library
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                Risk management framework
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                Lifetime updates
              </li>
            </ul>
            
            <a
              href="#buy-playbook"
              className="block w-full text-center rounded-full bg-emerald-600 py-4 text-white font-bold hover:bg-emerald-500 transition-all"
            >
              Buy Now - Instant Download
            </a>
            
            <p className="text-center text-slate-500 text-xs mt-4">
              One-time payment • 60-day guarantee • PDF + Code
            </p>
          </div>
          
          {/* Product 2: Strategy Pack */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 ring-1 ring-slate-700 hover:ring-indigo-500/50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-500/20 mb-6">
              <span className="text-3xl">⚡</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              Strategy Pack
            </h2>
            
            <p className="text-slate-400 text-sm mb-4">
              10 battle-tested trading strategies with code
            </p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-slate-500 line-through ml-2">$99</span>
              <div className="text-indigo-400 text-sm mt-1">🎯 Most Popular</div>
            </div>
            
            
            <ul className="space-y-3 text-slate-300 mb-8 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✓</span>
                10 ready-to-run strategies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✓</span>
                Python implementation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✓</span>
                Backtest results included
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✓</span>
                Entry/exit rules
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✓</span>
                Risk parameters
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✓</span>
                Market regime filters
              </li>
            </ul>
            
            
            <a
              href="#buy-strategies"
              className="block w-full text-center rounded-full bg-indigo-600 py-4 text-white font-bold hover:bg-indigo-500 transition-all"
            >
              Buy Strategy Pack
            </a>
            
            <p className="text-center text-slate-500 text-xs mt-4">
              One-time • Instant download • Python code
            </p>
          </div>
          
          {/* Product 3: Quick-Start Course */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 ring-1 ring-slate-700 hover:ring-violet-500/50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-violet-500/20 mb-6">
              <span className="text-3xl">🎓</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              Zero to Bot Course
            </h2>
            
            <p className="text-slate-400 text-sm mb-4">
              4-hour video course to deploy your first bot
            </p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$199</span>
              <span className="text-slate-500 line-through ml-2">$397</span>
              <div className="text-violet-400 text-sm mt-1">50% Launch Special</div>
            </div>
            
            
            <ul className="space-y-3 text-slate-300 mb-8 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-violet-400">✓</span>
                4 hours of video content
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">✓</span>
                From zero to live bot
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">✓</span>
                Hyperliquid setup
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">✓</span>
                Ollama AI integration
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">✓</span>
                Dashboard creation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">✓</span>
                Private Discord access
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400">✓</span>
                Q&A support included
              </li>
            </ul>
            
            
            <a
              href="#buy-course"
              className="block w-full text-center rounded-full bg-violet-600 py-4 text-white font-bold hover:bg-violet-500 transition-all"
            >
              Enroll Now
            </a>
            
            
            <p className="text-center text-slate-500 text-xs mt-4">
              Video course • Lifetime access • 30-day refund
            </p>
          </div>
        </div>
        
        
        {/* Bundle Deal */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-900/50 via-slate-900 to-violet-900/50 p-8 ring-1 ring-emerald-500/30">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Complete Starter Kit
                </h3>
                <p className="text-slate-400 mb-4">
                  Get the Playbook + Strategy Pack + Course. 
                  Everything you need to start trading with bots.
                </p>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-emerald-400">$249</span>
                  <span className="text-slate-500 line-through">$693</span>
                  <span className="text-emerald-400 font-medium">(Save $444)</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <a
                  href="#buy-bundle"
                  className="inline-flex rounded-full bg-white py-4 px-8 text-slate-900 font-bold hover:bg-gray-100 transition-all"
                >
                  Get Complete Kit →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
