import PaymentLinkButton from '@/components/PaymentLinkButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Trading Playbook | AutonomousAlpha',
  description: '120+ pages of battle-tested trading strategies used by pro traders. Complete with Python code, backtests, and step-by-step instructions.',
};

export default function PlaybookPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
                <span className="text-sm text-purple-300 font-medium">📚 Digital Playbook</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                The AI Trading
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Playbook</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-xl mb-8">
                120+ pages of battle-tested strategies used by pro traders. 
                Complete with Python code, backtests, and step-by-step instructions.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Instant Download
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Working Code
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  30-Day Guarantee
                </div>
              </div>
              
              {/* Price Card */}
              <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl p-6 border border-purple-500/30 max-w-md">
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-bold text-white">$99</span>
                  <span className="text-gray-400 line-through">$149</span>
                  <span className="text-green-400 text-sm font-medium">33% OFF</span>
                </div>
                
                <PaymentLinkButton 
                  amount={99}
                  productName="AI Trading Playbook"
                />
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  🔒 Secure payment via Stripe
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-2xl p-8 flex items-center justify-center border border-purple-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI Trading Playbook</h3>
                  <p className="text-gray-400">Professional Edition</p>
                  <div className="mt-6 inline-flex items-center gap-1 text-sm text-purple-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    120+ Pages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Preview */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">What's Inside</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '5 Battle-Tested Strategies',
                description: 'Momentum, mean reversion, breakout, grid, and hybrid strategies with 2+ years of backtest data.',
                icon: '🎯'
              },
              {
                title: 'Complete Python Code',
                description: 'Ready-to-run code for Hyperliquid, Binance, and Uniswap. Copy, paste, trade.',
                icon: '🐍'
              },
              {
                title: 'Risk Management Framework',
                description: 'Position sizing, stop losses, and drawdown controls used by institutional traders.',
                icon: '🛡️'
              },
              {
                title: 'Live Performance Metrics',
                description: 'Real PnL data, win rates, and Sharpe ratios from strategies actually deployed.',
                icon: '📊'
              },
              {
                title: 'Step-by-Step Setup',
                description: 'From API keys to first trade. Screenshots, commands, and troubleshooting.',
                icon: '📖'
              },
              {
                title: 'Private Community Access',
                description: 'Join our Discord for support, updates, and alpha sharing.',
                icon: '💬'
              }
            ].map((item) => (
              <div key={item.title} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join traders already using these strategies
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PaymentLinkButton 
              amount={99}
              productName="AI Trading Playbook"
            />
          </div>
          
          <p className="text-gray-500 mt-4">
            30-day money-back guarantee. Questions? hello@autonomousalpha.io
          </p>
        </div>
      </section>
    </div>
  );
}
