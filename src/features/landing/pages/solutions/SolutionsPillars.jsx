import { ArrowUpRight } from 'lucide-react'

const pillars = [
  {
    title: 'GDP Audit Compliance',
    desc: 'Rigorous standards governing medicine handling, certified by clinical-grade operational procedures.',
    featured: false,
  },
  {
    title: 'Multi-Zone Cooling',
    desc: 'Simultaneous chilled, frozen, and ambient cargo in distinct reefer compartments — one trip.',
    featured: true,
  },
  {
    title: 'Full Chain of Custody',
    desc: 'Tamper-proof temperature logs delivered automatically upon every delivery confirmation.',
    featured: false,
  },
]

export default function SolutionsPillars() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Centered header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-5xl leading-tight tracking-tight mb-5">
            Built for <span className="text-[#0056B8]">mission-critical</span><br />supply chains.
          </h2>
          <p className="font-body-unique text-slate-400 text-sm leading-relaxed">
            We maintain the integrity of your temperature-sensitive cargo using three core engineering pillars — from booking to delivery.
          </p>
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map(({ title, desc, featured }) => (
            <div
              key={title}
              className={`relative rounded-3xl p-7 flex flex-col justify-between min-h-[280px] transition-all duration-300 ${
                featured
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
              }`}
            >
              {/* Arrow icon top-right */}
              <div className="flex justify-end">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  featured ? 'bg-white/15' : 'bg-[#0056B8]'
                }`}>
                  <ArrowUpRight className={`w-4 h-4 ${featured ? 'text-white' : 'text-white'}`} />
                </span>
              </div>

              {/* Text bottom */}
              <div className="mt-auto pt-10">
                <h3 className={`font-heading-unique font-bold text-lg leading-snug mb-3 ${
                  featured ? 'text-white' : 'text-slate-900'
                }`}>
                  {title}
                </h3>
                <p className={`font-body-unique text-sm leading-relaxed ${
                  featured ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
