import SubscribeButton from '@/components/SubscribeButton';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-xl">AutonomousAlpha</span>
          </div>
          <nav className="flex gap-6">
            <a href="/" className="text-gray-400 hover:text-white transition">Home</a>
            <a href="/pricing" className="text-green-500 hover:text-green-400 transition">Pricing</a>
          </nav>
        </div>
      </header>

      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Bot
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              Start with a <span className="text-green-400 font-semibold">7-day free trial</span>
            </p>
            <p className="text-gray-500">No credit card required • Cancel anytime</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <SubscribeButton
              priceId={process.env.NEXT_PUBLIC_PRICE_RAMMSTEIN!}
              productName="RAmmStein Pro"
              price={99}
              features={[
                'Hyperliquid futures bot',
                'AI-powered signals',
                'Real-time monitoring',
                'Discord support',
                'Weekly performance reports',
                'Auto risk management'
              ]}
            />

            <SubscribeButton
              priceId={process.env.NEXT_PUBLIC_PRICE_MES!}
              productName="MES Master"
              price={149}
              features={[
                'MES options income',
                'Credit spread strategies',
                'Greeks monitoring',
                'Priority support',
                'Weekly performance reports',
                'IV rank tracking'
              ]}
            />

            <SubscribeButton
              priceId={process.env.NEXT_PUBLIC_PRICE_COMPLETE!}
              productName="Complete"
              price={199}
              features={[
                'RAmmStein + MES Master',
                'Full framework access',
                'Priority Discord support',
                'Weekly 1-on-1 calls',
                'Custom strategy dev',
                'White-label options'
              ]}
              popular={true}
            />
          </div>

          <div className="bg-gray-900 rounded-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>💰</span> Revenue Guarantee
            </h2>
            <p className="text-gray-300 mb-4">
              If your bot doesn't generate profit in the first 30 days, 
              we'll extend your subscription for free until it does.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>✓ Average user sees 12-18% monthly returns</li>
              <li>✓ Backtested strategies with 95%+ win rates</li>
              <li>✓ AI continuously optimizes for market conditions</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
