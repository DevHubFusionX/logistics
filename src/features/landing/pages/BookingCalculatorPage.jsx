import { PriceCalculator } from '@/features/booking'
import SEO from '@/components/common/SEO'
import { motion } from 'framer-motion'
import { Calculator, Truck, ShieldCheck, MapPin, Clock, Thermometer, PhoneCall, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BookingCalculatorPage() {
  const popularCorridors = [
    { from: 'Lagos', to: 'Abuja (FCT)', distance: '~750 km', duration: '24–36 hrs', note: 'High frequency pharma & frozen food' },
    { from: 'Lagos', to: 'Port Harcourt', distance: '~620 km', duration: '20–30 hrs', note: 'Oil & gas and commercial seafood' },
    { from: 'Lagos', to: 'Kano', distance: '~1,000 km', duration: '36–48 hrs', note: 'Northern FMCG & agro corridor' },
    { from: 'Lagos', to: 'Onitsha', distance: '~450 km', duration: '14–20 hrs', note: 'Pharmaceutical wholesale hub' },
    { from: 'Lagos', to: 'Ibadan', distance: '~130 km', duration: 'Same day', note: 'Regional industrial distribution' },
    { from: 'Apapa Port', to: 'Mainland Warehouses', distance: 'Intra-state', duration: 'Express', note: 'Bonded container evacuation' },
  ]

  const truckSizes = [
    { size: '5-Ton Reefer', use: 'City & intra-state distribution, retail pharmacy drops, fresh foods', temp: '-20°C to +25°C' },
    { size: '10-Ton Haulage', use: 'Interstate commercial distribution, frozen poultry, dairy batches', temp: '-20°C to +25°C' },
    { size: '15-Ton Multi-Zone', use: 'Dual-compartment frozen + chilled pharma loads', temp: 'Multi-temperature' },
    { size: '30-Ton Heavy Duty', use: 'Port-to-warehouse containers, nationwide FMCG long-haul', temp: 'Deep freeze / dry' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-28 pb-20">
      <SEO
        title="Refrigerated Truck Hire & Interstate Haulage Price Calculator Nigeria — Darafort"
        description="Calculate instant shipping quotes for reliable refrigerated truck hire in Nigeria. Interstate haulage rates from Lagos to Abuja, Port Harcourt, Kano, and all 36 states with IoT temperature monitoring."
        keywords="interstate haulage rates Lagos to Abuja, truck hire price per day Nigeria, refrigerated truck hire in Nigeria, reliable refrigerated trucks for businesses, cold chain logistics cost Nigeria, 30 ton truck hire price, container haulage from Apapa port, B2B logistics companies in Nigeria"
        canonical="/booking-calculator"
        breadcrumbs={[{ name: 'Booking Calculator', url: '/booking-calculator' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Darafort Cold-Chain Rate Calculator',
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'description': 'Online price calculator for refrigerated truck hire, pharma haulage, and temperature-controlled logistics across Nigeria.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'NGN'
          }
        }}
      />

      <main className="flex-1 container mx-auto px-4 max-w-5xl flex flex-col items-center">
        {/* Header with SEO H1 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0056B8] border border-blue-100 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Rate Estimation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4"
          >
            Refrigerated Truck Hire & Haulage Price Calculator
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Get an instant, transparent estimate for temperature-controlled reefer trucks (5T, 10T, 15T, 30T) and enterprise dry freight across all 36 Nigerian states.
          </motion.p>
        </div>

        {/* Calculator Widget */}
        <div className="w-full flex justify-center mb-16">
          <PriceCalculator />
        </div>

        {/* Popular Interstate Freight Corridors (SEO & SEM intent capture) */}
        <section className="w-full mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Popular Interstate Haulage Corridors
            </h2>
            <p className="text-slate-600 text-sm">
              We operate daily dedicated refrigerated reefer runs across Nigeria’s primary commercial highways.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularCorridors.map((route, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <MapPin className="w-4 h-4 text-[#0056B8]" />
                    <span>{route.from}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{route.to}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {route.distance}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Timeline: {route.duration}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {route.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tonnage & Fleet Specs */}
        <section className="w-full mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Available Truck Sizes & Configurations
            </h2>
            <p className="text-slate-600 text-sm">
              From city distribution to 30-ton interstate trailers, our 300+ reefer fleet meets all capacity requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {truckSizes.map((truck, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0056B8] flex items-center justify-center mb-3">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{truck.size}</h3>
                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold mb-2">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{truck.temp}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{truck.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust & Guarantee Banner */}
        <div className="w-full bg-gradient-to-r from-[#003366] to-[#0056B8] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Goods-in-Transit Insurance & ±0.1°C IoT Telemetry</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Need a Custom Corporate Contract?</h3>
            <p className="text-slate-200 text-sm max-w-xl">
              Talk directly with our enterprise dispatch desk for multi-truck fleet bookings, dedicated recurring routes, or port container evacuation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="tel:+2349054610119"
              className="px-6 py-3 bg-white text-[#003366] font-bold rounded-lg text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +234 905 461 0119</span>
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-sm transition-colors text-center cursor-pointer"
            >
              Submit RFQ
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
