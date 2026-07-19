import React from 'react'
import { X, Calendar, Building2, Truck, Package, MapPin, CheckCircle, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react'

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || '—'}</p>
    </div>
  )
}

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null

  const formatCurrency = (val) => {
    if (typeof val === 'string' && val.includes('₦')) return val
    const n = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val
    return `₦${(n || 0).toLocaleString()}`
  }

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  }

  const isFulfilled = order.status === 'Fulfilled'

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-xs text-gray-400 font-mono">#{order.id}</p>
            <h2 className="font-heading font-bold text-gray-900 mt-0.5">Order details</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {/* Status banner */}
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
            isFulfilled ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'
          }`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isFulfilled ? 'bg-emerald-500' : 'bg-red-500'
            }`}>
              {isFulfilled
                ? <CheckCircle className="w-4 h-4 text-white" />
                : <AlertCircle className="w-4 h-4 text-white" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${isFulfilled ? 'text-emerald-800' : 'text-red-800'}`}>
                {order.status}
              </p>
              {!isFulfilled && order.reason && order.reason !== '-' && (
                <p className="text-xs text-red-600 mt-0.5">{order.reason}</p>
              )}
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(order.date)}</span>
          </div>

          {/* Details grid */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 grid grid-cols-2 gap-4">
            <Field label="Company"  value={order.company}   />
            <Field label="Fleet"    value={order.fleet}     />
            <Field label="Cargo"    value={order.goodsType} />
            <Field label="Truck"    value={order.truckSize} />
          </div>

          {/* Route */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-700" /> Route
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">From</p>
                <p className="text-sm font-semibold text-gray-900">{order.pickup}</p>
              </div>
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-sky-700" />
                <div className="w-8 h-px bg-gray-300" />
                <div className="w-2 h-2 rounded-full border-2 border-sky-700" />
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">To</p>
                <p className="text-sm font-semibold text-gray-900">{order.delivery}</p>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-sky-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-sky-300 font-semibold uppercase tracking-wider">Revenue</p>
              <p className="text-2xl font-heading font-black text-white mt-1">{formatCurrency(order.revenue)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-sky-400" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
