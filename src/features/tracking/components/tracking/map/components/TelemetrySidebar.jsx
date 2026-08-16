import React from 'react'
import { MapPin, Gauge, Thermometer, Clock, ShieldCheck, Navigation } from 'lucide-react'

function StatCard({ icon: Icon, iconClass, label, value }) {
  return (
    <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconClass}`} />
      <div>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-xs font-bold text-slate-800 font-mono">{value}</p>
      </div>
    </div>
  )
}

export default function TelemetrySidebar({
  telemetry,
  isLive,
  isDelivered,
  originText,
  destinationText,
}) {
  const badgeClass =
    telemetry.status === 'delivered' ? 'bg-emerald-100 text-emerald-700'
    : telemetry.status === 'in_transit' ? 'bg-blue-100 text-blue-700'
    : 'bg-amber-100 text-amber-700'

  const statusText =
    telemetry.status === 'delivered' ? 'Arrived'
    : telemetry.status === 'in_transit' ? 'In Transit'
    : telemetry.status.replace(/_/g, ' ')

  return (
    <div className="w-full lg:w-[300px] bg-white border-t lg:border-t-0 lg:border-l border-slate-100 p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Navigation className={`w-4 h-4 text-[#0056B8] ${isLive ? 'animate-pulse' : ''}`} />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {isLive ? 'Live Telemetry' : 'Trip Summary'}
          </span>
        </div>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${badgeClass}`}>
          {statusText}
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {/* Location */}
        <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              {isDelivered ? 'Delivered To' : 'Last Known Location'}
            </p>
            <p className="text-xs font-bold text-slate-800 break-words">{telemetry.locationName}</p>
          </div>
        </div>

        {/* Speed & Temp */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Gauge} iconClass="text-blue-500"
            label="Speed"
            value={isLive ? `${telemetry.speed} km/h` : '—'}
          />
          <StatCard
            icon={Thermometer} iconClass="text-rose-500"
            label="Reefer Temp"
            value={telemetry.temperature}
          />
        </div>

        {/* ETA & Distance */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
            <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">ETA</p>
              <p className="text-xs font-bold text-blue-600">{telemetry.eta}</p>
            </div>
          </div>
          <StatCard
            icon={ShieldCheck} iconClass="text-emerald-500"
            label="Distance"
            value={isDelivered ? '0 km' : `${telemetry.distanceRemaining} km`}
          />
        </div>

        {/* Route summary */}
        <div className="bg-slate-50 rounded-xl p-3 space-y-2">
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Route</p>
          <div className="flex items-start gap-2">
            <span className="text-green-500 text-xs mt-0.5">●</span>
            <p className="text-xs font-semibold text-slate-700 break-words">{originText}</p>
          </div>
          <div className="ml-[6px] w-0.5 h-3 bg-slate-200" />
          <div className="flex items-start gap-2">
            <span className="text-red-500 text-xs mt-0.5">●</span>
            <p className="text-xs font-semibold text-slate-700 break-words">{destinationText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
