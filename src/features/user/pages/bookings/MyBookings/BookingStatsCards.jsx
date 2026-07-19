import { useNavigate } from 'react-router-dom'
import { Truck, CreditCard, Package, ArrowUpRight } from 'lucide-react'

export default function BookingStatsCards({ bookingStats, totalSpend, loading }) {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-sky-700 via-sky-800 to-sky-900 border border-sky-600/30 rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex justify-between items-start z-10 relative">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Truck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-5 z-10 relative">
          <h3 className="text-3xl font-black text-white tracking-tight">{bookingStats.deliveredThisMonth}</h3>
          <p className="text-sm text-sky-100 font-semibold mt-1.5">Completed deliveries</p>
        </div>
        <div className="absolute right-3 bottom-3 opacity-[0.05] pointer-events-none">
          <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 100 100">
            {[15,35,55,75].flatMap(x => [15,35,55].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="3"/>))}
          </svg>
        </div>
      </div>

      <div className="bg-gradient-to-br from-sky-700 via-sky-800 to-sky-900 border border-sky-600/30 rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex justify-between items-start z-10 relative">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <CreditCard className="w-5 h-5" />
          </div>
          <span className="px-2 py-0.5 text-[10px] font-extrabold text-white bg-white/20 border border-white/25 rounded-md tracking-wider">NGN</span>
        </div>
        <div className="mt-5 z-10 relative">
          <h3 className="text-3xl font-black text-white tracking-tight">
            ₦{totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <p className="text-sm text-sky-100 font-semibold mt-1.5">Total spend</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-sky-700 via-sky-800 to-sky-900 border border-sky-600/30 rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex justify-between items-start z-10 relative">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Package className="w-5 h-5" />
          </div>
          <button
            onClick={() => navigate('/booking-status-guide')}
            className="px-2.5 py-1 text-[11px] font-bold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-lg transition-all flex items-center gap-1.5"
          >
            Guide <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="mt-5 z-10 relative">
          <h3 className="text-3xl font-black text-white tracking-tight">
            {bookingStats.pendingCount + bookingStats.activeCount}
          </h3>
          <p className="text-sm text-sky-100 font-semibold mt-1.5">Active shipments</p>
        </div>
      </div>
    </div>
  )
}
