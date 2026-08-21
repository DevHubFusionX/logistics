const challenges = [
  { num: '01', title: 'Fragmented Capacity', desc: 'Uncoordinated reefer operators — high costs, underutilized cold space.' },
  { num: '02', title: 'Zero Visibility',     desc: "GPS tracks trucks. Nobody tracks what's inside them." },
  { num: '03', title: 'Temperature Risk',    desc: 'Excursions go undetected until cargo arrives spoiled.' },
  { num: '04', title: 'Manual Everything',   desc: 'Calls, paper waybills, offline loggers — all overhead.' },
]

export default function TechnologyChallenge() {
  return (
    <section className="py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-3">The Problem</span>
            <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-5xl leading-tight tracking-tight max-w-lg">
              Why cold chains break.
            </h2>
          </div>
          <p className="font-body-unique text-slate-400 text-sm max-w-xs leading-relaxed">
            Legacy software was never designed for temperature-sensitive logistics.
          </p>
        </div>

        {/* Challenge rows */}
        <div className="divide-y divide-slate-100">
          {challenges.map(({ num, title, desc }) => (
            <div
              key={num}
              className="grid grid-cols-[48px_1fr_2fr] items-center gap-8 py-7 group"
            >
              <span className="font-mono text-[11px] font-bold text-slate-300 group-hover:text-[#0056B8] transition-colors">
                {num}
              </span>
              <h3 className="font-heading-unique font-bold text-slate-900 text-base sm:text-lg">
                {title}
              </h3>
              <p className="font-body-unique text-slate-400 text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
