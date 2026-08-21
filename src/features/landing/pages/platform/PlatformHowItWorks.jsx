export default function PlatformHowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              How it works behind the scenes
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              DaraOS reads the confirmations, emails, and delivery updates you already receive. No portals, no logins, no structured handoffs. It reconciles the contradictions, learns your patterns, and surfaces one reliable arrival date you can plan and bank against.
            </p>
            <p className="font-heading-unique font-bold text-slate-800 text-base sm:text-lg">
              Complexity in. Clarity out.
            </p>
          </div>

          {/* Right Column: Animated Wireframe SVG */}
          <div className="lg:col-span-6 w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-200/80 relative overflow-hidden flex items-center justify-center">
            
            <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] max-h-[340px] relative z-10 text-slate-400 select-none">
              {/* Ellipse orbit 1 */}
              <ellipse cx="200" cy="200" rx="180" ry="180" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-15" />
              
              {/* Ellipse orbit 2 (vertical ellipse) */}
              <ellipse cx="200" cy="200" rx="60" ry="180" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-25" />
              
              {/* Ellipse orbit 3 (tilted ellipse) */}
              <g transform="rotate(30 200 200)">
                <ellipse cx="200" cy="200" rx="110" ry="180" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20" />
              </g>

              {/* Ellipse orbit 4 (reverse tilted ellipse) */}
              <g transform="rotate(-30 200 200)">
                <ellipse cx="200" cy="200" rx="110" ry="180" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20" />
              </g>

              {/* Central double loop logo */}
              <g transform="translate(172, 172) scale(1.4)">
                {/* Outer loop */}
                <path
                  d="M10 20 C3.33 20 0 15 0 10 C0 5 3.33 0 10 0 C16.67 0 20 5 20 10 C20 15 16.67 20 10 20 Z"
                  fill="none"
                  stroke="#E05A2B"
                  strokeWidth="3.5"
                  className="opacity-90"
                />
                {/* Inner loop offset for double loop style */}
                <path
                  d="M12 18 C7 18 4.5 14 4.5 10 C4.5 6 7 2 12 2"
                  fill="none"
                  stroke="#E05A2B"
                  strokeWidth="2.5"
                  className="opacity-75"
                />
              </g>

              {/* Node: Emails */}
              <g className="animate-pulse">
                <circle cx="286" cy="132" r="4.5" fill="#475569" />
                <text x="296" y="135" className="font-body-unique text-[10px] font-semibold fill-slate-500">Emails</text>
              </g>

              {/* Node: PO Confirmation */}
              <g className="animate-pulse [animation-delay:0.5s]">
                <circle cx="305" cy="215" r="4.5" fill="#475569" />
                <text x="315" y="218" className="font-body-unique text-[10px] font-semibold fill-slate-500">PO Confirmation</text>
              </g>

              {/* Node: Invoice */}
              <g className="animate-pulse [animation-delay:1s]">
                <circle cx="338" cy="290" r="4.5" fill="#475569" />
                <text x="348" y="293" className="font-body-unique text-[10px] font-semibold fill-slate-500">Invoice</text>
              </g>

              {/* Node: Delivery Data */}
              <g className="animate-pulse [animation-delay:1.5s]">
                <circle cx="260" cy="330" r="4.5" fill="#475569" />
                <text x="270" y="333" className="font-body-unique text-[10px] font-semibold fill-slate-500">Delivery Data</text>
              </g>

              {/* Node: Supplier Communication */}
              <g className="animate-pulse [animation-delay:2s]">
                <circle cx="120" cy="180" r="4.5" fill="#475569" />
                <text x="110" y="183" textAnchor="end" className="font-body-unique text-[10px] font-semibold fill-slate-500">Supplier Communication</text>
              </g>
            </svg>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-slate-300/30 blur-[80px]" />
          </div>

        </div>
      </div>
    </section>
  )
}
