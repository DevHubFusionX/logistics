const stats = [
  { value: '99.8%', label: 'Temperature SLA', desc: 'Continuous compliance across every long-haul route.' },
  { value: '-35%',  label: 'Spoilage Reduced', desc: 'Optimized handoffs and field-cooling cut degradation.' },
  { value: '<60s',  label: 'Alert Response',   desc: 'Instant SMS & email when readings deviate from config.' },
]

export default function SolutionsStats() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {stats.map(({ value, label, desc }) => (
            <div key={label} className="px-0 md:px-12 first:pl-0 last:pr-0 py-10 md:py-0">
              <p className="font-heading-unique font-extrabold text-slate-900 tracking-tight leading-none mb-4"
                 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
                {value}
              </p>
              <p className="font-heading-unique font-bold text-slate-800 text-sm mb-2">{label}</p>
              <p className="font-body-unique text-slate-400 text-xs leading-relaxed max-w-[220px]">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
