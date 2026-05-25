import { Package, ArrowRight, ArrowLeft, Snowflake, Pill, Box, Truck } from 'lucide-react'
import toast from 'react-hot-toast'

const packageTypes = [
  { label: 'Frozen Foods',    type: 'Frozen Foods',    icon: Snowflake, desc: 'Ice cream, meat, seafood' },
  { label: 'Pharmaceuticals', type: 'Pharmaceuticals', icon: Pill,      desc: 'Vaccines, medicines, biologics' },
  { label: 'General Cargo',   type: 'General',         icon: Box,       desc: 'Dry goods, FMCG, retail' },
]

const truckSizes = [
  { label: '5 Tons',  value: 5,  desc: 'Small loads' },
  { label: '10 Tons', value: 10, desc: 'Medium loads' },
  { label: '15 Tons', value: 15, desc: 'Large loads' },
]

export default function PackageStep({ formData, onChange, onNext, onBack, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.goodsType) { toast.error('Please select a cargo type'); return }
    if (!formData.truckSize)  { toast.error('Please select a truck size');  return }
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="bg-white rounded-none sm:rounded-2xl border-y sm:border border-gray-100 p-5 sm:p-6 w-full space-y-6">
        <div>
          <h3 className="font-heading font-bold text-gray-900 text-lg">What are you shipping?</h3>
          <p className="text-sm text-gray-400 mt-0.5">Select cargo type and truck size</p>
        </div>

        {/* Cargo type */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cargo type</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {packageTypes.map(({ label, type, icon: Icon, desc }) => {
              const selected = formData.goodsType === type
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange('goodsType', type)}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                    selected
                      ? 'border-sky-700 bg-sky-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    selected ? 'bg-sky-700 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${selected ? 'text-sky-700' : 'text-gray-800'}`}>{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Truck size */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Truck size
          </label>
          <div className="grid grid-cols-3 gap-3">
            {truckSizes.map(({ label, value, desc }) => {
              const selected = formData.truckSize === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    onChange('truckSize', value)
                    onChange('vehicleType', label)
                    onChange('cargoWeightKg', value * 1000)
                  }}
                  className={`py-4 px-3 rounded-xl border text-center transition-all ${
                    selected
                      ? 'border-sky-700 bg-sky-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className={`text-sm font-bold ${selected ? 'text-sky-700' : 'text-gray-800'}`}>{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
        >
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Calculating…</>
            : <>Check prices <ArrowRight className="w-4 h-4" /></>
          }
        </button>
      </div>
    </form>
  )
}
