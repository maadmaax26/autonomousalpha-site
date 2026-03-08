export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          AutonomousAlpha
        </a>
        
        <div className="flex items-center gap-6">
          <a href="/products" className="text-slate-300 hover:text-white transition-colors">
            Products
          </a>
          
          <a href="/pricing" className="text-slate-300 hover:text-white transition-colors">
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  )
}
