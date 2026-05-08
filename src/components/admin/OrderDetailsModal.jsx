import React from 'react'
import { 
  X, Calendar, Building2, Truck, Package, 
  MapPin, CheckCircle2, AlertCircle, TrendingUp,
  Download, Copy, Share2, ClipboardCheck
} from 'lucide-react'

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null

  const formatCurrency = (val) => {
    if (typeof val === 'string' && val.includes('₦')) return val
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Logistics Dispatch</span>
              <span className="text-[10px] font-bold text-gray-400"># {order.id}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Trip Specification</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-200">
          
          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
            order.status === 'Fulfilled' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
              : 'bg-rose-50 border-rose-100 text-rose-800'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              order.status === 'Fulfilled' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              {order.status === 'Fulfilled' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-60">Fulfillment Status</p>
              <h3 className="text-lg font-bold">{order.status} Trip</h3>
            </div>
            {order.status === 'Unfulfilled' && (
              <div className="ml-auto text-right">
                <p className="text-xs font-bold uppercase tracking-wider opacity-60">Primary Reason</p>
                <p className="text-sm font-bold text-rose-600">{order.reason}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Enterprise Info */}
            <div className="space-y-6">
              <section>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" /> Client Information
                </h4>
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-sm font-bold text-gray-900">{order.company}</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-tight">Contracted Principal</p>
                </div>
              </section>

              <section>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Package className="w-3.5 h-3.5" /> Cargo Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Commodity Type</span>
                    <span className="font-bold text-gray-900">{order.goodsType}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Truck Requirement</span>
                    <span className="font-bold text-gray-900">{order.truckSize}</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Logistics Chain */}
            <div className="space-y-6">
              <section>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5" /> Carrier Service
                </h4>
                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50">
                  <p className="text-sm font-bold text-blue-900">{order.fleet}</p>
                  <p className="text-xs text-blue-600 mt-1 uppercase font-bold tracking-tight">Fleet Operator</p>
                </div>
              </section>

              <section>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> Trip Financials
                </h4>
                <div className="bg-gray-900 rounded-2xl p-4 text-white">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Estimated Revenue</p>
                  <p className="text-xl font-bold">{formatCurrency(order.revenue)}</p>
                </div>
              </section>
            </div>
          </div>

          {/* Route Overview */}
          <section className="bg-gray-50/50 rounded-[28px] p-6 border border-gray-100">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Operational Path
            </h4>
            <div className="relative pl-10 space-y-8">
              {/* Pickup */}
              <div className="relative">
                <div className="absolute -left-10 top-1 w-6 h-6 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center z-10 shadow-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
                <div className="absolute -left-[31px] top-7 bottom-[-28px] w-0.5 border-l-2 border-dashed border-gray-300" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Origin Terminal</p>
                <p className="text-sm font-bold text-gray-900">{order.pickup} Hub</p>
              </div>
              
              {/* Delivery */}
              <div className="relative">
                <div className="absolute -left-10 top-1 w-6 h-6 bg-white border-2 border-rose-500 rounded-full flex items-center justify-center z-10 shadow-sm">
                   <MapPin className="w-3 h-3 text-rose-500" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Final Destination</p>
                <p className="text-sm font-bold text-gray-900">{order.delivery} Terminal</p>
              </div>
            </div>
          </section>

          {/* Timestamp */}
          <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Logged on {formatDate(order.date)}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
          <button 
            className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button 
            className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Share2 className="w-4 h-4" /> Share Trip
          </button>
          <button 
             onClick={onClose}
             className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
