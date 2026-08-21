export default function PlatformOverview({ onBookDemo }) {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Title, Subtitle, and Checklist */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-4">
              Built for how supply chains really work
            </h2>
            <p className="font-body-unique text-slate-500 text-base sm:text-lg leading-relaxed mb-8">
              Closes the gaps that cost more to manage than to resolve.
            </p>

            <ul className="w-full flex flex-col border-t border-slate-100 divide-y divide-slate-100 mb-10">
              {[
                "Understands buyer-side consolidations, mixed shipments, and blanket POs",
                "Matches supplier confirmations across part numbers, systems, and naming errors",
                "Responds to disruption signals buried in emails — not just clean files or structured forms",
                "Supports global teams with multilingual parsing and logic that adapts to local customs"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 py-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0056B8] mt-2 shrink-0" />
                  <span className="font-body-unique text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={onBookDemo}
              className="font-body-unique px-8 py-3.5 bg-[#0056B8] hover:bg-[#004bb0] hover:scale-[1.02] active:scale-[0.98] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer text-center"
            >
              Get a Demo
            </button>
          </div>

          {/* Right Column: Blank Image/Graphic Container */}
          <div className="lg:col-span-6 w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-200/80 relative overflow-hidden flex items-center justify-center">
            {/* Subtle background glow/ambient effect to feel premium even when blank */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-slate-300/30 blur-[80px]" />
          </div>

        </div>
      </div>
    </section>
  )
}
