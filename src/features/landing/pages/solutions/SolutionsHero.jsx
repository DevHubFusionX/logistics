import { Link } from 'react-router-dom'

export default function SolutionsHero({ onBookDemo }) {
  return (
    <section className="min-h-screen flex flex-col pt-28" style={{ backgroundColor: '#0056B8' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col">

        {/* Full-width headline */}
        <h1
          className="font-heading-unique font-extrabold text-white leading-[1.05] tracking-tight pt-10 pb-14"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)' }}
        >
          Cold-chain solutions<br />built for your industry.
        </h1>

        {/* Two columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: text + CTA */}
          <div className="flex flex-col gap-6 max-w-sm">
            <p className="font-body-unique text-blue-100 text-sm leading-relaxed">
              From GDP-compliant pharma logistics to farm-to-shelf food distribution — Dara delivers purpose-built cold-chain solutions across every temperature-sensitive industry.
            </p>
            <p className="font-body-unique text-blue-100 text-sm leading-relaxed">
              Real-time visibility, temperature monitoring and verified compliance — from booking to proof of delivery.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={onBookDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0056B8] text-sm font-bold font-body-unique hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Book a Demo
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white text-sm font-bold font-body-unique hover:bg-white/10 transition-colors"
              >
                Speak to Dara
              </Link>
            </div>
          </div>

          {/* Right: image */}
          <div className="rounded-3xl overflow-hidden w-full aspect-[4/3]">
            <img
              src="/assets/img/enterprise.jpg"
              alt="Cold chain solutions"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Bottom trusted-by bar */}
        <div className="border-t border-white/15 py-7 flex flex-col sm:flex-row sm:items-center gap-5 mt-12">
          <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase flex-shrink-0">
            Trusted by
          </span>
          <div className="flex flex-wrap gap-3">
            {['Pharma', 'Agriculture', 'Retail', 'FMCG', 'Healthcare'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-white/20 text-[11px] font-bold text-white/60 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
