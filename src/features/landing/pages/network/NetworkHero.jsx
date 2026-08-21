export default function NetworkHero({ onBookDemo }) {
  return (
    <section className="pt-32 pb-20 bg-slate-50/50 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">Our Network</span>
            <h1
              className="font-heading-unique font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
            >
              Physical cold-chain infrastructure,<br />digitally orchestrated.
            </h1>
            <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              Dara connects a growing network of refrigerated assets, cold storage facilities and verified carrier partners — all coordinated through DaraOS with real-time visibility and temperature compliance.
            </p>
            <button
              onClick={onBookDemo}
              className="px-6 py-3 bg-[#0056B8] hover:bg-[#004aad] text-white rounded-sm font-heading-unique font-bold text-sm transition-all"
            >
              Partner with Dara
            </button>
          </div>

          {/* Right Column: Creative SVG combining Letter 'D' & Truck */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[380px] aspect-square bg-white rounded-3xl border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative flex items-center justify-center p-6 select-none overflow-hidden">
              
              <svg viewBox="0 0 300 300" className="w-full h-full text-slate-300">
                {/* Background grid/paths */}
                <line x1="20" y1="50" x2="280" y2="50" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="20" y1="150" x2="280" y2="150" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="20" y1="250" x2="280" y2="250" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="50" y1="20" x2="50" y2="280" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="150" y1="20" x2="150" y2="280" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="250" y1="20" x2="250" y2="280" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Network nodes/connection points */}
                <circle cx="50" cy="50" r="3" fill="#CBD5E1" />
                <circle cx="250" cy="50" r="3" fill="#CBD5E1" />
                <circle cx="50" cy="250" r="3" fill="#CBD5E1" />
                <circle cx="250" cy="250" r="3" fill="#CBD5E1" />

                {/* --- The 'D' & Truck Fusion Shape --- */}
                {/* Straight vertical bar of the 'D' (Route Track) */}
                <g>
                  {/* Vertical route line */}
                  <line 
                    x1="90" y1="60" x2="90" y2="240" 
                    stroke="#0056B8" strokeWidth="4.5" strokeLinecap="round" 
                  />
                  {/* Animated glowing route nodes */}
                  <circle cx="90" cy="70" r="6" fill="#0056B8" />
                  <circle cx="90" cy="70" r="10" stroke="#0056B8" strokeWidth="1.5" fill="none" className="animate-ping" />

                  <circle cx="90" cy="150" r="5" fill="#E05A2B" />
                  <circle cx="90" cy="230" r="6" fill="#0056B8" />
                  <circle cx="90" cy="230" r="10" stroke="#0056B8" strokeWidth="1.5" fill="none" className="animate-ping" />
                </g>

                {/* Curved loop of 'D' stylized as a sleek semi-truck outline */}
                <g>
                  {/* The outer truck cabin & trailer profile curve of 'D' */}
                  <path 
                    d="M 90 60 
                       L 180 60 
                       Q 230 60, 230 110 
                       L 230 145 
                       L 215 145
                       L 215 155
                       L 235 155
                       L 235 185
                       Q 235 240, 180 240
                       L 90 240" 
                    fill="none" 
                    stroke="#0056B8" 
                    strokeWidth="4.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Inner details of the truck cab / cargo box representing the D's inner loop */}
                  <path
                    d="M 120 90
                       L 170 90
                       Q 195 90, 195 125
                       L 195 160
                       Q 195 210, 170 210
                       L 120 210
                       Z"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />

                  {/* Truck wheels integrated into the bottom curve of the letter D */}
                  {/* Wheel 1 (Front Cab wheel) */}
                  <g>
                    <circle cx="215" cy="240" r="11" fill="white" stroke="#0056B8" strokeWidth="3" />
                    <circle cx="215" cy="240" r="4.5" fill="#0056B8" />
                  </g>
                  {/* Wheel 2 (Rear trailer wheels) */}
                  <g>
                    <circle cx="130" cy="240" r="11" fill="white" stroke="#0056B8" strokeWidth="3" />
                    <circle cx="130" cy="240" r="4.5" fill="#0056B8" />
                  </g>
                  <g>
                    <circle cx="155" cy="240" r="11" fill="white" stroke="#0056B8" strokeWidth="3" />
                    <circle cx="155" cy="240" r="4.5" fill="#0056B8" />
                  </g>

                  {/* Wind deflector / cab details at front of 'D' */}
                  <path 
                    d="M 230 110 L 215 125 L 215 145" 
                    fill="none" 
                    stroke="#0056B8" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                  />
                </g>

                {/* Orbiting temperature & telemetry nodes */}
                {/* Chilled snowflake node */}
                <g className="animate-pulse">
                  <circle cx="240" cy="80" r="14" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1" />
                  <path d="M 240 75 L 240 85 M 235 80 L 245 80" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                {/* GPS Pin node */}
                <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                  <circle cx="60" cy="120" r="14" fill="#FFEFEA" stroke="#FFDAD0" strokeWidth="1" />
                  <circle cx="60" cy="120" r="4" fill="#E05A2B" />
                </g>
              </svg>

              {/* Subtle background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-blue-50/50 blur-[80px]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
