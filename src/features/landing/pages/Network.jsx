import { Link } from 'react-router-dom'
import SEO from '@/components/common/SEO'
import { Snowflake, Warehouse, Map, Handshake, Building2, ArrowRight } from 'lucide-react'

const networkAssets = [
  {
    icon: Snowflake,
    title: 'Partner Reefer Capacity',
    desc: 'Access our growing fleet of temperature-controlled trucks optimized for pharma and food logistics.'
  },
  {
    icon: Warehouse,
    title: 'Distributed Cold Hubs',
    desc: 'Fully monitored multi-chamber storage depots situated at strategic transport nodes.'
  },
  {
    icon: Map,
    title: '36-State Route Coverage',
    desc: 'Reliable cold chain delivery capability spanning every key trade route and urban center in Nigeria.'
  },
  {
    icon: Handshake,
    title: 'Strategic Alliances',
    desc: 'Coordinating verified third-party carriers to support seasonal overflow demand and special volumes.'
  }
]

export default function Network() {
  return (
    <>
      <SEO
        title="Dara Cold-Chain Logistics Network Coverage"
        description="Explore Dara's connected logistics network. Multi-chamber storage, verified reefer capacity, and 36-state distribution routes."
        keywords="logistics network, cold storage hubs, reefer trucks Nigeria, pharmaceutical transport network"
        canonical="/network"
      />

      <div className="bg-white min-h-screen text-left">
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-slate-50/50 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-3">
              Our Network
            </span>
            <h1 className="font-heading-unique font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 text-4xl sm:text-6xl max-w-4xl">
              Connected cold-chain logistics network
            </h1>
            <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
              Dara links digital orchestration with physical cold infrastructure to guarantee continuous temperature compliance.
            </p>
          </div>
        </section>

        {/* Network Features Grid */}
        <section className="py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {networkAssets.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#0056B8]/10 text-[#0056B8] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-heading-unique font-bold text-slate-900 text-base mb-2">{title}</h3>
                    <p className="font-body-unique text-slate-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Split statistics & interactive live mapping route */}
            <div className="bg-[#0a1628] rounded-[32px] p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center select-none">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-bold tracking-widest text-blue-300 uppercase block mb-3">At A Glance</span>
                <h3 className="font-heading-unique font-extrabold text-white text-2xl sm:text-3.5xl leading-tight mb-6">
                  Africa's growing infrastructure network
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { val: '120+', label: 'Partner Reefers' },
                    { val: '12', label: 'Storage Depots' },
                    { val: '36', label: 'States Reached' },
                    { val: '99.4%', label: 'Delivery Integrity' }
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <span className="text-2xl sm:text-3xl font-extrabold block text-white">{val}</span>
                      <span className="text-[10px] text-blue-200/60 block mt-0.5">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column placeholder for tracking linkage */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4 text-left">
                <span className="text-[10px] font-bold text-slate-450 uppercase">Network Operations Control</span>
                <p className="text-xs text-slate-300 font-body-unique leading-relaxed">
                  Every dispatch runs on geofenced routing corridors with continuous IoT telemetry. Track consignment status and monitor real-time vehicle routes directly via our control map.
                </p>
                <Link
                  to="/tracking"
                  className="inline-flex items-center gap-1.5 self-start py-2.5 px-6 bg-[#0056B8] hover:bg-[#004aad] text-white rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  Track Consignment <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
