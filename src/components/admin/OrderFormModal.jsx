import React, { useState, useEffect, useRef } from 'react'
import { 
  X, Calendar, Building2, Truck, Package, 
  MapPin, CheckCircle2, AlertCircle, TrendingUp,
  Save, Loader2, ChevronDown, Check
} from 'lucide-react'

const goodsTypes = ['Cement', 'Pharmaceuticals', 'Frozen Foods', 'Construction Materials', 'Electronic Components', 'Consumer Goods', 'Chemicals']
const truckSizes = ['15', '20', '30', 'Small (2 Ton)', 'Medium (5 Ton)', 'Reefer (10 Ton)', 'Large (20 Ton)', 'Trailer (30 Ton)']
const locations = ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Jos', 'Kaduna', 'Enugu']
const fleetCompanies = ['Fleet-A1', 'Dara Logistics', 'GIG Logistics', 'DHL Nigeria', 'Kobo360', 'Ace Logistics', 'Cold Hubs', 'EDV Ventures', 'Ide Richy Logistics', 'Sure Trucks Ltd', 'Azeez Jamal Transports', 'Retail Box']

export default function OrderFormModal({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) {
  const [fleetOpen, setFleetOpen] = useState(false)
  const fleetRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fleetRef.current && !fleetRef.current.contains(e.target)) setFleetOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const [formData, setFormData] = useState({
    company: '',
    truckSize: truckSizes[0],
    goodsType: goodsTypes[0],
    pickup: locations[0],
    delivery: locations[1],
    fleet: fleetCompanies[0],
    status: 'Fulfilled',
    revenue: 1500000,
    date: new Date().toISOString().split('T')[0],
    reason: '-'
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      })
    } else {
      setFormData({
        company: '',
        truckSize: truckSizes[0],
        goodsType: goodsTypes[0],
        pickup: locations[0],
        delivery: locations[1],
        fleet: fleetCompanies[0],
        status: 'Fulfilled',
        revenue: 1500000,
        date: new Date().toISOString().split('T')[0],
        reason: '-'
      })
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert date string back to ISO for backend consistency if needed
    const submissionData = {
      ...formData,
      date: new Date(formData.date).toISOString()
    }
    onSubmit(submissionData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'revenue' ? Number(value) : value 
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {initialData ? 'Edit Dispatch Order' : 'New Logistical Dispatch'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Enter enterprise shipment specifications</p>
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div className="md:col-span-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" /> Contracting Company
              </label>
              <input 
                required
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Dangote Group"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold placeholder:text-gray-300 transition-all text-sm"
              />
            </div>

            {/* Truck Size */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Truck className="w-3.5 h-3.5" /> Truck Specification
              </label>
              <select 
                name="truckSize"
                value={formData.truckSize}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-sm appearance-none cursor-pointer"
              >
                {truckSizes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Goods Type */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Package className="w-3.5 h-3.5" /> Cargo Category
              </label>
              <select 
                name="goodsType"
                value={formData.goodsType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-sm appearance-none cursor-pointer"
              >
                {goodsTypes.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Locations */}
            <div>
              <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Pickup Terminal
              </label>
              <select 
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-sm appearance-none cursor-pointer"
              >
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Delivery Point
              </label>
              <select 
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-sm appearance-none cursor-pointer"
              >
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Fleet & Status */}
            <div className="relative" ref={fleetRef}>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Truck className="w-3.5 h-3.5" /> Fleet Partner
              </label>
              <button
                type="button"
                onClick={() => setFleetOpen(prev => !prev)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-sm cursor-pointer flex items-center justify-between gap-2 text-left hover:bg-gray-100"
              >
                <span className="truncate">{formData.fleet || 'Select fleet partner'}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${fleetOpen ? 'rotate-180' : ''}`} />
              </button>
              {fleetOpen && (
                <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-48 overflow-y-auto py-1.5 scrollbar-thin scrollbar-thumb-gray-200">
                    {fleetCompanies.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => { setFormData(prev => ({ ...prev, fleet: f })); setFleetOpen(false) }}
                        className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between gap-2 transition-colors duration-150 ${
                          formData.fleet === f
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'text-gray-700 hover:bg-gray-50 font-medium'
                        }`}
                      >
                        <span className="truncate">{f}</span>
                        {formData.fleet === f && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Dispatch Status
              </label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="Fulfilled">Fulfilled</option>
                <option value="Unfulfilled">Unfulfilled</option>
              </select>
            </div>

             {/* Revenue & Date */}
             <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Gross Revenue (NGN)
              </label>
              <input 
                required
                type="number"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-sm"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Dispatch Date
              </label>
              <input 
                required
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-sm"
              />
            </div>

            {formData.status === 'Unfulfilled' && (
               <div className="md:col-span-2">
               <label className="text-[11px] font-bold text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <AlertCircle className="w-3.5 h-3.5" /> Failure Reason
               </label>
               <input 
                 required
                 name="reason"
                 value={formData.reason}
                 onChange={handleChange}
                 placeholder="e.g. Vehicle breakdown, Weather obstruction"
                 className="w-full px-4 py-3 bg-rose-50/50 border-none rounded-xl focus:ring-2 focus:ring-rose-500/20 font-bold placeholder:text-rose-200 transition-all text-sm"
               />
             </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
          <button 
            type="button"
            onClick={onClose} 
            className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="flex-[2] py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {initialData ? 'Update Dispatch' : 'Confirm Dispatch Log'}
          </button>
        </div>
      </div>
    </div>
  )
}
