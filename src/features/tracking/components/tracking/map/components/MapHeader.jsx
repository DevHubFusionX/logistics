import React from 'react'
import { Gauge, Wifi, WifiOff } from 'lucide-react'

export default function MapHeader({ isLive, isDelivered, showTelemetry, onToggleTelemetry }) {
  const statusLabel = isDelivered
    ? 'Delivered'
    : isLive
    ? 'Live GPS'
    : 'Route Overview'

  const dotClass = isLive
    ? 'bg-green-500 animate-ping'
    : isDelivered
    ? 'bg-emerald-500'
    : 'bg-amber-400 animate-pulse'

  return (
    <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2.5">
        <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
        {statusLabel}
      </h3>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleTelemetry}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 border border-blue-100"
        >
          <Gauge className="w-3.5 h-3.5" />
          {showTelemetry ? 'Hide Details' : 'Show Details'}
        </button>

        <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
          isLive ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-600'
        }`}>
          {isLive ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {isLive ? 'Firebase Live' : isDelivered ? 'Completed' : 'Static Route'}
        </div>
      </div>
    </div>
  )
}
