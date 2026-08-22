export default function NetworkGlance() {
  const stats = [
    {
      value: '300',
      label: 'Reefer Trucks',
      desc: 'Active, IoT-monitored refrigerated trucks coordinated across Nigeria.'
    },
    {
      value: '500',
      label: 'Dry Trucks',
      desc: 'Dry cargo and standard haulage assets across our distribution network.'
    },
    {
      value: '12',
      label: 'Cold Storage Depots',
      desc: 'Strategic regional cold storage hubs at major transit points.'
    },
    {
      value: '36',
      label: 'States Covered',
      desc: 'Seamless distribution across every state and route.'
    },
    {
      value: '99.4%',
      label: 'Delivery Integrity',
      desc: 'Proven track record of zero temperature excursions and safe arrivals.'
    }
  ]

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100 text-left select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
            Network at a Glance
          </span>
          <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
            Nigeria's most connected cold-chain logistics network.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between h-full"
            >
              <div>
                <span className="font-heading-unique font-bold text-slate-950 text-3xl sm:text-4xl lg:text-5xl tracking-tight block mb-3">
                  {stat.value}
                </span>
                <span className="font-heading-unique font-bold text-[#0056B8] text-sm tracking-wide block mb-2">
                  {stat.label}
                </span>
              </div>
              <p className="font-body-unique text-slate-500 text-xs sm:text-sm leading-relaxed mt-2">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
