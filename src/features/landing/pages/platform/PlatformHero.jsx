import { Lock, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PlatformHero({ 
  onBookDemo 
}) {
  return (
    <section className="bg-white pt-32 pb-16 text-left overflow-hidden relative">
      
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[130px] pointer-events-none z-0" />
      
      {/* Minimalist Dot Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title and CTA actions */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h1 className="font-heading-unique font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6 text-4xl sm:text-6xl lg:text-[64px]">
              The platform powering your operations
            </h1>
            
            <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              DaraOS makes it easy to orchestrate fleet capacity, track temperature telemetry, and manage consignment lifecycles. Built to unify cold-chain logistics in real time.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/auth/signup"
                className="font-body-unique px-8 py-3.5 bg-[#0056B8] hover:bg-[#004aad] text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
              >
                Try DaraOS for free
              </Link>
              <button
                onClick={onBookDemo}
                className="font-body-unique px-8 py-3.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold rounded-full text-xs sm:text-sm transition-all cursor-pointer"
              >
                Book a demo
              </button>
            </div>
          </div>

          {/* Right Column: Rounded image and dashboard card overlay (Stacker inspiration) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/3] sm:aspect-[1.1/1] w-full border border-slate-100 shadow-xl bg-slate-100 z-10">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80"
                alt="Operations Management Team"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              
              {/* Overlay 1: "Orders review" card */}
              <div className="absolute top-8 left-8 bg-white border border-slate-150 p-5 rounded-2xl shadow-lg w-52 sm:w-56 z-20 pointer-events-none select-none">
                <p className="font-heading-unique font-bold text-slate-800 text-xs sm:text-sm mb-3">
                  Orders review
                </p>
                {/* Circular chart design */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full border-[8px] border-slate-100 flex items-center justify-center">
                    <div className="absolute inset-[-8px] rounded-full border-[8px] border-emerald-500 border-r-transparent border-b-transparent rotate-[45deg]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-bold text-slate-500 font-body-unique">98.4% On Time</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0056B8]" />
                      <span className="text-[9px] font-bold text-slate-500 font-body-unique">1.6% Pending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay 2: "Share with Partners" badge */}
              <div className="absolute bottom-28 right-8 bg-[#0056B8] text-white px-4 py-2 rounded-full shadow-md text-[10px] sm:text-xs font-bold z-20 flex items-center gap-2 pointer-events-none select-none">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Partners</span>
              </div>

              {/* Overlay 3: "Share securely with DaraOS" header at bottom */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 px-4 py-3.5 rounded-2xl shadow-lg z-20 flex items-center justify-between pointer-events-none select-none">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0056B8]/10 text-[#0056B8] flex items-center justify-center">
                    <Lock className="w-3 h-3" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800 font-body-unique">
                    Share securely with DaraOS
                  </span>
                </div>
                {/* Carousel page indicator lights */}
                <div className="flex gap-1.5 items-center">
                  <span className="w-5 h-1 bg-[#0056B8] rounded-full" />
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}



