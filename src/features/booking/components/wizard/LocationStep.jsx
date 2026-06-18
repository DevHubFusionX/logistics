import { MapPin, ArrowRight } from 'lucide-react'
import { NIGERIAN_CITIES } from '@/constants/cities'
import toast from 'react-hot-toast'
import FormSelect from './FormSelect'

export default function LocationStep({ formData, onChange, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.dropoffLocation.city) {
      toast.error('Please select a delivery city')
      return
    }
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="bg-white rounded-none sm:rounded-2xl border-y sm:border border-gray-100 p-5 sm:p-6 w-full shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="mb-6">
          <h3 className="font-heading font-bold text-gray-900 text-lg">Where are you shipping?</h3>
          <p className="text-sm text-gray-400 mt-0.5">Select pickup and delivery locations</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Pickup */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-700 inline-block" />
              Pickup city
            </label>
            <div className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-gray-50/50 border border-gray-100 text-gray-500 flex items-center justify-between select-none">
              <span>Lagos</span>
            </div>
            <p className="text-xs text-gray-400">All shipments depart from Lagos</p>
          </div>

          {/* Delivery */}
          <FormSelect
            label="Delivery city"
            value={formData.dropoffLocation.city}
            onChange={(value) => onChange('dropoffLocation', 'city', value)}
            options={NIGERIAN_CITIES.filter(c => c !== 'Lagos').map(city => ({ value: city, label: city }))}
            placeholder="Select delivery city…"
            iconDot={<span className="w-2.5 h-2.5 rounded-full border-2 border-sky-700 inline-block" />}
          />
        </div>

        {/* Route preview */}
        {formData.dropoffLocation.city && (
          <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-sky-50/50 rounded-xl flex-1 border border-sky-100/40">
              <span className="text-sm font-semibold text-sky-750">Lagos</span>
              <ArrowRight className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-sky-750">{formData.dropoffLocation.city}</span>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-sm shadow-sky-500/10 transition-all duration-200 cursor-pointer"
      >
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  )
}

