import { Link } from 'react-router-dom'

/**
 * PageCTA — uniform bottom-of-page CTA used across all public pages.
 *
 * Props:
 *  eyebrow    {string}   — small uppercase label above headline
 *  headline   {string}   — main heading (supports \n for line breaks)
 *  body       {string}   — supporting paragraph
 *  onBookDemo {function} — opens the ScheduleDemoModal
 */
export default function PageCTA({ eyebrow = 'Get Started', headline, body, onBookDemo }) {
  return (
    <section className="py-24 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#0056B8] rounded-[32px] px-10 py-16 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative overflow-hidden">

          {/* Dot grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />

          {/* Left: headline */}
          <div className="relative z-10">
            <span className="text-[11px] font-bold tracking-widest text-blue-200 block mb-4 uppercase">
              {eyebrow}
            </span>
            <h2
              className="font-heading-unique font-extrabold text-white leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
              {headline.split('\n').map((line, i) => (
                <span key={i}>{line}{i < headline.split('\n').length - 1 && <br />}</span>
              ))}
            </h2>
          </div>

          {/* Right: body + buttons */}
          <div className="flex flex-col gap-6 items-start lg:items-end relative z-10">
            <p className="font-body-unique text-blue-100 text-sm leading-relaxed max-w-sm lg:text-right">
              {body}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onBookDemo}
                className="font-body-unique px-7 py-3 bg-white text-[#0056B8] hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] font-bold text-sm rounded-full transition-all cursor-pointer shadow-lg shadow-black/10"
              >
                Book a Demo
              </button>
              <Link
                to="/contact"
                className="font-body-unique px-7 py-3 border border-white/20 text-white font-bold text-sm rounded-full hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Speak to Dara
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
