import React, { useState, useEffect, useRef } from 'react'
import { X, Building2, Truck, Package, MapPin, TrendingUp, Calendar, AlertCircle, Save, Loader2, ChevronDown, Check } from 'lucide-react'
import NIGERIAN_STATES from '../../../../constants/nigerianStates'

const GOODS_TYPES    = ['Cement', 'Pharmaceuticals', 'Frozen Foods', 'Construction Materials', 'Electronic Components', 'Consumer Goods', 'Chemicals']
const TRUCK_SIZES    = ['Small (2 Ton)', 'Medium (5 Ton)', 'Reefer (10 Ton)', 'Large (20 Ton)', 'Trailer (30 Ton)', '15', '20', '30']
const FLEET_PARTNERS = ['Fleet-A1', 'Dara Logistics', 'GIG Logistics', 'DHL Nigeria', 'Kobo360', 'Ace Logistics', 'Cold Hubs', 'EDV Ventures', 'Ide Richy Logistics', 'Sure Trucks Ltd', 'Azeez Jamal Transports', 'Retail Box']
const LOCATIONS      = NIGERIAN_STATES

function Label({ icon: Icon, children, color = 'text-gray-400' }) {
  return (
    <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-1.5 ${color}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </label>
  )
}

function Field({ children }) {
  return <div>{children}</div>
}

const inputCls = 'w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all'

export default function OrderFormModal({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) {
  const [fleetOpen, setFleetOpen] = useState(false)
  const fleetRef = useRef(null)

  const defaultForm = {
    company: '', truckSize: TRUCK_SIZES[0], goodsType: GOODS_TYPES[0],
    pickup: LOCATIONS[0], delivery: LOCATIONS[1], fleet: FLEET_PARTNERS[0],
    status: 'Fulfilled', revenue: 1500000,
    date: new Date().toISOString().split('T')[0], reason: '-'
  }

  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (!isOpen) return
    if (initialData) {
      setForm({
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : defaultForm.date
      })
    } else {
      setForm(defaultForm)
    }
  }, [initialData, isOpen])

  useEffect(() => {
    const handler = e => { if (fleetRef.current && !fleetRef.current.contains(e.target)) setFleetOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!isOpen) return null

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const handleChange = e => set(e.target.name, e.target.name === 'revenue' ? Number(e.target.value) : e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ ...form, date: new Date(form.date).toISOString() })
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-heading font-bold text-gray-900">
              {initialData ? 'Edit dispatch' : 'New dispatch'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Enter shipment specifications</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">

          {/* Company */}
          <Field>
            <Label icon={Building2}>Company</Label>
            <input required name="company" value={form.company} onChange={handleChange}
              placeholder="e.g. Dangote Group" className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            {/* Truck */}
            <Field>
              <Label icon={Truck}>Truck size</Label>
              <select name="truckSize" value={form.truckSize} onChange={handleChange} className={inputCls}>
                {TRUCK_SIZES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>

            {/* Goods */}
            <Field>
              <Label icon={Package}>Cargo type</Label>
              <select name="goodsType" value={form.goodsType} onChange={handleChange} className={inputCls}>
                {GOODS_TYPES.map(g => <option key={g}>{g}</option>)}
              </select>
            </Field>

            {/* Pickup */}
            <Field>
              <Label icon={MapPin} color="text-emerald-600">Pickup</Label>
              <select name="pickup" value={form.pickup} onChange={handleChange} className={inputCls}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </Field>

            {/* Delivery */}
            <Field>
              <Label icon={MapPin} color="text-red-500">Delivery</Label>
              <select name="delivery" value={form.delivery} onChange={handleChange} className={inputCls}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </Field>
          </div>

          {/* Fleet — custom dropdown */}
          <Field>
            <Label icon={Truck}>Fleet partner</Label>
            <div className="relative" ref={fleetRef}>
              <button
                type="button"
                onClick={() => setFleetOpen(o => !o)}
                className={`${inputCls} flex items-center justify-between gap-2 text-left`}
              >
                <span className="truncate">{form.fleet}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${fleetOpen ? 'rotate-180' : ''}`} />
              </button>
              {fleetOpen && (
                <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="max-h-44 overflow-y-auto py-1">
                    {FLEET_PARTNERS.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => { set('fleet', f); setFleetOpen(false) }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                          form.fleet === f ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="truncate">{f}</span>
                        {form.fleet === f && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <Field>
              <Label icon={TrendingUp}>Status</Label>
              <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Unfulfilled">Unfulfilled</option>
              </select>
            </Field>

            {/* Date */}
            <Field>
              <Label icon={Calendar}>Date</Label>
              <input required type="date" name="date" value={form.date} onChange={handleChange} className={inputCls} />
            </Field>

            {/* Revenue */}
            <Field>
              <Label icon={TrendingUp}>Revenue (₦)</Label>
              <input required type="number" name="revenue" value={form.revenue} onChange={handleChange} className={inputCls} />
            </Field>
          </div>

          {/* Failure reason */}
          {form.status === 'Unfulfilled' && (
            <Field>
              <Label icon={AlertCircle} color="text-red-500">Failure reason</Label>
              <input
                required
                name="reason"
                value={form.reason === '-' ? '' : form.reason}
                onChange={handleChange}
                placeholder="e.g. Vehicle breakdown, weather obstruction"
                className={`${inputCls} border-red-200 focus:border-red-400 focus:ring-red-100`}
              />
            </Field>
          )}
        </form>

        {/* Footer */}
        <div className="flex-shrink-0 flex gap-3 px-5 pb-5 pt-3 border-t border-gray-100">
          <button type="button" onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="flex-[2] py-3 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isLoading ? 'Saving…' : initialData ? 'Update dispatch' : 'Create dispatch'}
          </button>
        </div>
      </div>
    </div>
  )
}
